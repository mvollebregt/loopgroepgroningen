import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {NieuwsState} from '../store/nieuws.state';

@Injectable({
  providedIn: 'root'
})
export class NieuwsOpslagService {

  private static readonly key = 'nieuws';

  constructor(private storage: Storage) {
  }

  getOpgeslagenNieuws(): Observable<Partial<NieuwsState>> {
    return from(this.storage.get(NieuwsOpslagService.key));
  }

  setOpgeslagenNieuws(nieuws: NieuwsState) {
    return from(this.storage.set(NieuwsOpslagService.key, this.getOpTeSlaan(nieuws)));
  }

  private getOpTeSlaan(nieuws: NieuwsState): Partial<NieuwsState> {
    return {
      berichten: nieuws.berichten.slice(0, 15)
    };
  }
}
