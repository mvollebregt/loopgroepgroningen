import {Injectable} from "@angular/core";
import {Bericht} from "./bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordClient} from "./prikbord.client";
import {Storage} from '@ionic/storage';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class PrikbordService {

  private static readonly key = 'prikbord';
  private berichten = new ReplaySubject<Bericht[]>(1);
  private berichtenNogLeeg = true;

  constructor(private storage: Storage, private prikbordClient: PrikbordClient) {
    this.berichten.pipe(
      take(1)
    ).subscribe(() => this.berichtenNogLeeg = false);
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
    return this.prikbordClient.verstuurBericht(berichttekst).pipe(
        tap(berichten => this.synchroniseerBerichten(berichten)),
        map(() => null)
      );
  }

  synchroniseer(): void {
    // haal de meest recente berichten op van het prikbord
    this.prikbordClient.haalBerichtenOp().subscribe(resultaat => {
      this.synchroniseerBerichten(resultaat);
    });
  }

  private synchroniseerBerichten(berichten) {
    // haal de opgeslagen berichten uit de opslag
    this.storage.get(PrikbordService.key).then(opgeslagen => {
      // check of er nieuwe berichten zijn bijgekomen
      opgeslagen = opgeslagen || [];
      let nieuwste = opgeslagen.length > 0 ? opgeslagen[opgeslagen.length - 1] : null;
      let aantalNieuwe = berichten.findIndex(bericht => PrikbordService.equal(bericht, nieuwste));
      aantalNieuwe = aantalNieuwe != -1 ? aantalNieuwe : berichten.length;
      if (aantalNieuwe !== 0 || !opgeslagen.length) {
        // Er zijn nieuwe berichten bij gekomen. Sla deze op en stuur ze naar observers.
        opgeslagen.push(...berichten.slice(0, aantalNieuwe).reverse()); // oud naar nieuw
        this.storage.set(PrikbordService.key, opgeslagen);
        this.berichten.next(opgeslagen);
      }
    })
  }

  private static equal(links: Bericht, rechts: Bericht) {
    if (PrikbordService.differNull(links, rechts)
      || links.auteur !== rechts.auteur
      || links.tijdstip !== rechts.tijdstip
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
}
