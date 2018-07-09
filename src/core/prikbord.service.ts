import {Injectable, OnDestroy} from "@angular/core";
import {Bericht} from "./bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordClient} from "./prikbord.client";
import {Storage} from '@ionic/storage';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {map, pluck, take, takeUntil, tap} from 'rxjs/operators';
import {NotificatieService} from './notificatie.service';
import {InstellingenService} from './instellingen/instellingen.service';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PrikbordService implements OnDestroy {

  private static readonly key = 'prikbord';
  private berichten = new ReplaySubject<Bericht[]>(1);
  private berichtenNogLeeg = true;
  private demoModus = false;
  private destroy = new Subject<boolean>();

  constructor(
    private storage: Storage,
    private notificatieService: NotificatieService,
    private prikbordClient: PrikbordClient,
    instellingenService: InstellingenService,) {
    this.berichten.pipe(
      take(1)
    ).subscribe(() => this.berichtenNogLeeg = false);
    instellingenService.getInstellingen().pipe(
      pluck('demoModus'),
      takeUntil(this.destroy)
    ).subscribe((value: boolean) => this.demoModus = value);
  }

  getBerichten(): Observable<Bericht[]> {
    if (this.berichtenNogLeeg) {
      // haal de berichten uit de opslag als we dat nog niet gedaan hebben
      this.storage.get(PrikbordService.key).then(berichten => {
        // berichten alleen zetten als niet in de tussentijd al gesynchroniseerd is
        if (berichten && this.berichtenNogLeeg) {
          this.berichten.next(berichten);
        }
      })
    }
    return this.berichten;
  }

  verstuurBericht(berichttekst: string): Observable<{}> {
    if (this.demoModus) {
      this.verstuurDemoBericht(berichttekst);
      return of({});
    } else {
      return this.prikbordClient.verstuurBericht(berichttekst).pipe(
        tap(berichten => this.synchroniseerBerichten(berichten)),
        tap(() => this.notificatieService.triggerNotificaties()),
        map(() => null)
      );
    }
  }

  synchroniseer(): void {
    // haal de meest recente berichten op van het prikbord
    this.prikbordClient.haalBerichtenOp().subscribe(resultaat => {
      this.synchroniseerBerichten(resultaat);
      this.notificatieService.resetNotificaties();
    });
  }

  private synchroniseerBerichten(berichten) {
    // haal de opgeslagen berichten uit de opslag
    this.storage.get(PrikbordService.key).then(opgeslagen => {
      // check of er nieuwe berichten zijn bijgekomen
      opgeslagen = opgeslagen || [];
      let aantalNieuwe = berichten.findIndex(bericht => PrikbordService.equal(bericht, this.zoekNieuwste(opgeslagen)));
      aantalNieuwe = aantalNieuwe != -1 ? aantalNieuwe : berichten.length;
      if (aantalNieuwe !== 0 || !opgeslagen.length) {
        // Er zijn nieuwe berichten bij gekomen. Sla deze op en stuur ze naar observers.
        opgeslagen.push(...berichten.slice(0, aantalNieuwe).reverse()); // oud naar nieuw
        this.storage.set(PrikbordService.key, opgeslagen);
        this.berichten.next(opgeslagen);
      }
    })
  }

  private zoekNieuwste(berichten: Bericht[]) {
    let index = berichten.length - 1;
    while (index > -1 && berichten[index].auteur === 'demo') {
      index--;
    }
    return index > -1 ? berichten[index] : null;
  }

  private verstuurDemoBericht(berichttekst: string) {
    this.storage.get(PrikbordService.key).then((opgeslagen: Bericht[]) => {
      opgeslagen.push({auteur: 'demo', tijdstip: moment().toISOString(), berichttekst: [berichttekst]});
      this.storage.set(PrikbordService.key, opgeslagen);
      this.berichten.next(opgeslagen);
    })
  }

  private static equal(links: Bericht, rechts: Bericht) {
    if (PrikbordService.differNull(links, rechts)
      || links.auteur !== rechts.auteur
      || links.tijdstip.substring(0, 16) !== rechts.tijdstip.substring(0, 16) // skip time zone
      || PrikbordService.differNull(links.berichttekst, rechts.berichttekst)
      || links.berichttekst.length !== rechts.berichttekst.length) {
      return false;
    } else {
      for (let i = 0; i < links.berichttekst.length; i++) {
        if (links.berichttekst[i] !== rechts.berichttekst[i]) {
          return false;
        }
      }
    }
    return true;
  }

  private static differNull(links: any, rechts: any) {
    return (links === null || rechts === null) && links !== rechts;
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }
}
