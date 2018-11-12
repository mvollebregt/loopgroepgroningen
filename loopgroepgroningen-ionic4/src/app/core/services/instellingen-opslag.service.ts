import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {InstellingenState} from '../store/instellingen/instellingen.state';
import {fromPromise} from 'rxjs/internal-compatibility';
import {CoreOpslag} from './core-opslag';

@Injectable({
  providedIn: 'root'
})
export class InstellingenOpslagService {

  private static readonly key = 'instellingen';

  constructor(private storage: Storage) {
  }

  getOpgeslagenInstellingen(): Observable<InstellingenState> {
    return fromPromise(this.getOpgeslagenInstallingenAsync());
  }

  setOpgeslagenInstellingen(instellingen: InstellingenState) {
    return fromPromise(this.setOpgeslagenInstallingenAsync(instellingen));
  }

  private async getOpgeslagenInstallingenAsync(): Promise<InstellingenState | null> {
    const instellingen: CoreOpslag = await this.storage.get(InstellingenOpslagService.key);
    return instellingen && {
      groep: instellingen.groep
    };
  }

  private async setOpgeslagenInstallingenAsync(instellingenState: InstellingenState): Promise<void> {
    const opgeslagenInstellingen = await this.getOpgeslagenInstallingenAsync() || {} as InstellingenState;
    opgeslagenInstellingen.groep = instellingenState.groep;
    await this.storage.set(InstellingenOpslagService.key, opgeslagenInstellingen);
  }
}
