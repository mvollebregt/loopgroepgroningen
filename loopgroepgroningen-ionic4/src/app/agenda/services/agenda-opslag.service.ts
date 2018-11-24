import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {AgendaState, EvenementState} from '../store/agenda.state';
import {agenda} from '../../../../../loopgroepgroningen-backend/functions/src';
import {map} from 'rxjs/operators';

interface AgendaOpslag {
  [propName: string]: Partial<EvenementState>;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaOpslagService {

  private static readonly key = 'agenda';

  constructor(private storage: Storage) {
  }

  getOpgeslagenAgenda(): Observable<Partial<AgendaState>> {
    return from(this.storage.get(AgendaOpslagService.key)).pipe(map(this.getOpTeHalen));
  }

  setOpgeslagenAgenda(agenda: AgendaState) {
    return from(this.storage.set(AgendaOpslagService.key, this.getOpTeSlaan(agenda)));
  }

  private getOpTeSlaan(agenda: AgendaState): AgendaOpslag {
    const evenementen: AgendaOpslag = {};
    agenda.evenementStates.forEach((evenementState, sleutel) => {
      evenementen[sleutel] = {
        evenement: evenementState.evenement,
        teVerzendenBericht: evenementState.teVerzendenBericht
      }
    });
    return evenementen;
  }

  private getOpTeHalen(evenementen: AgendaOpslag): Partial<AgendaState> {
    return ({evenementStates: new Map(Object.entries(evenementen))} as Partial<AgendaState>);
  }
}
