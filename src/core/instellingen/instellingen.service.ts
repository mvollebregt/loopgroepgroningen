import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Storage} from '@ionic/storage';
import {Instellingen} from './instellingen';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class InstellingenService {

  private static readonly key = 'subject';
  private instellingen = null;
  private subject = new ReplaySubject(1);

  constructor(private storage: Storage) {
  }

  getInstellingen(): Observable<Instellingen> {
    if (!this.instellingen) {
      // haal de subject uit de opslag als we dat nog niet gedaan hebben
      this.storage.get(InstellingenService.key).then(instellingen => {
        this.instellingen = instellingen || {};
        this.subject.next(this.instellingen);
      })
    }
    return this.subject;
  }

  setInstellingen(instellingen: Instellingen) {
    const nieuweInstellingen = Object.assign(this.instellingen, instellingen);
    this.storage.set(InstellingenService.key, nieuweInstellingen).then(() => {
      this.subject.next(nieuweInstellingen);
    });
  }
}
