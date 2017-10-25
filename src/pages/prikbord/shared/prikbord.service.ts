import {Injectable} from "@angular/core";
import {Bericht} from "./bericht";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {PrikbordClient} from "./prikbord.client";
import {Storage} from '@ionic/storage';

@Injectable()
export class PrikbordService {

  private static readonly key = 'prikbord';
  private berichten = new BehaviorSubject<Bericht[]>([]);

  constructor(private storage: Storage, private prikbordClient: PrikbordClient) {
  }

  getBerichten(): Observable<Bericht[]> {
    if (this.berichten.getValue().length === 0) {
      // haal de berichten uit de opslag als we dat nog niet gedaan hebben
      this.storage.get(PrikbordService.key).then(berichten => {
        if (berichten) {
          this.berichten.next(berichten);
        }
      })
    }
    return this.berichten;
  }

  synchroniseer(): void {
    this.prikbordClient.haalBerichtenOp().subscribe(resultaat => {
      // check of er nieuwe berichten zijn bijgekomen
      let opgeslagen = this.berichten.getValue();
      let nieuwste = opgeslagen.length > 0 ? opgeslagen[opgeslagen.length - 1] : null;
      let aantalNieuwe = resultaat.findIndex(bericht => PrikbordService.equal(bericht, nieuwste));
      aantalNieuwe = aantalNieuwe != -1 ? aantalNieuwe : resultaat.length;
      if (aantalNieuwe !== 0) {
        // Er zijn nieuwe berichten bij gekomen. Sla deze op en stuur ze naar observers.
        opgeslagen.push(...resultaat.slice(0, aantalNieuwe).reverse()); // oud naar nieuw
        this.storage.set(PrikbordService.key, opgeslagen);
        this.berichten.next(opgeslagen);
      }
    });
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
