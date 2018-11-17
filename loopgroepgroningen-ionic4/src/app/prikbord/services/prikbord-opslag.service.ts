import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {PrikbordState} from '../store/prikbord.state';

@Injectable({
  providedIn: 'root'
})
export class PrikbordOpslagService {

  private static readonly key = 'prikbord';

  constructor(private storage: Storage) {
  }

  getOpgeslagenPrikbord(): Observable<Partial<PrikbordState>> {
    return from(this.storage.get(PrikbordOpslagService.key)).pipe(
      filter(prikbord => !Array.isArray(prikbord))
    );
  }

  setOpgeslagenPrikbord(prikbord: PrikbordState) {
    return from(this.storage.set(PrikbordOpslagService.key, this.getOpTeSlaan(prikbord)));
  }

  private getOpTeSlaan(prikbord: PrikbordState): Partial<PrikbordState> {
    return {
      berichten: prikbord.berichten.slice(prikbord.berichten.length - 10, prikbord.berichten.length),
      teVerzendenBericht: prikbord.teVerzendenBericht
    };
  }
}
