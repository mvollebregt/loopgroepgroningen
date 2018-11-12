import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {InstellingenState} from '../store/instellingen/instellingen.state';

@Injectable({
  providedIn: 'root'
})
export class InstellingenOpslagService {

  private static readonly key = 'instellingen';

  constructor(private storage: Storage) {
  }

  getOpgeslagenInstellingen(): Observable<InstellingenState> {
    return from(this.storage.get(InstellingenOpslagService.key));
  }

  setOpgeslagenInstellingen(instellingen: InstellingenState) {
    return from(this.storage.set(InstellingenOpslagService.key, this.getOpTeSlaan(instellingen)));
  }

  private getOpTeSlaan(instellingen: InstellingenState): Partial<InstellingenState> {
    return {
      groep: instellingen.groep
    };
  }
}
