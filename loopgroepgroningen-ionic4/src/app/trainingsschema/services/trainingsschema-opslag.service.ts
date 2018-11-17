import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {TrainingsschemaState} from '../store/trainingsschema.state';

@Injectable({
  providedIn: 'root'
})
export class TrainingsschemaOpslagService {

  private static readonly key = 'trainingsschema';

  constructor(private storage: Storage) {
  }

  getOpgeslagenTrainingsschema(): Observable<Partial<TrainingsschemaState>> {
    return from(this.storage.get(TrainingsschemaOpslagService.key));
  }

  setOpgeslagenTrainingsschema(trainingsschema: TrainingsschemaState) {
    return from(this.storage.set(TrainingsschemaOpslagService.key, this.getOpTeSlaan(trainingsschema)));
  }

  private getOpTeSlaan(state: TrainingsschemaState): Partial<TrainingsschemaState> {
    return {trainingsschema: state.trainingsschema};
  }
}
