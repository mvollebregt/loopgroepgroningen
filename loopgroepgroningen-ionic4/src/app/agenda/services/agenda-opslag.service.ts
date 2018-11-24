import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {AgendaState, EvenementState} from '../store/agenda.state';

@Injectable({
  providedIn: 'root'
})
export class AgendaOpslagService {

  private static readonly key = 'agenda';

  constructor(private storage: Storage) {
  }

  getOpgeslagenAgenda(): Observable<Partial<AgendaState>> {
    return from(this.storage.get(AgendaOpslagService.key));
  }

  setOpgeslagenAgenda(agenda: AgendaState) {
    return from(this.storage.set(AgendaOpslagService.key, this.getOpTeSlaan(agenda)));
  }

  private getOpTeSlaan(agenda: AgendaState): Partial<AgendaState> {
    const evenementenMap = new Map<string, EvenementState>();
    agenda.evenementStates.forEach((evenementState, sleutel) => {
      evenementenMap.set(sleutel, {
        evenement: evenementState.evenement,
        teVerzendenBericht: evenementState.teVerzendenBericht
      } as EvenementState);
    });
    return {
      evenementStates: evenementenMap
    };
  }
}
