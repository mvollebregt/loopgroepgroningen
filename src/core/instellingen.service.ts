import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Storage} from '@ionic/storage';

@Injectable()
export class InstellingenService {

  private static readonly key = 'instellingen';
  private instellingen = new BehaviorSubject<{groep: string}>(null);

  constructor(private storage: Storage) {
  }

  getInstellingen(): Observable<{groep: string}> {
    if (!this.instellingen.getValue()) {
      // haal de instellingen uit de opslag als we dat nog niet gedaan hebben
      this.storage.get(InstellingenService.key).then(instellingen => {
        // berichten alleen zetten als niet in de tussentijd al gesynchroniseerd is
        if (instellingen && !this.instellingen.getValue()) {
          this.instellingen.next(instellingen);
        }
      })
    }
    return this.instellingen;
  }

  setInstellingen(instellingen: {groep: string}) {
    this.storage.set(InstellingenService.key, instellingen).then(() => {
      this.instellingen.next(instellingen);
    });
  }

}
