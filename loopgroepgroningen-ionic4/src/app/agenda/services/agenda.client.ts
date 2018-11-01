import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/http.service';
import {Evenement} from '../../api';

@Injectable({providedIn: 'root'})
export class AgendaClient {

  constructor(private httpService: HttpService) {
  }

  getAgenda(): Observable<Evenement[]> {
    return this.httpService.get<Evenement[]>('agenda');
  }

  getEvenement(id: string): Observable<Evenement> {
    return this.httpService.get<Evenement>(`evenement/${id}`);
  }

  schrijfIn(evenement: Evenement, ingeschreven: boolean) {
    return this.httpService.post<Evenement>(`inschrijven/${evenement.id}`, ingeschreven);
  }

  verstuurBericht(evenement: Evenement, bericht: string) {
    return this.httpService.post<void>(`reageren/${evenement.id}`, bericht);
  }

}
