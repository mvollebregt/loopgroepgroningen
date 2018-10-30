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
    return this.httpService.get<Evenement>('${evenement}/${id}');
  }

}
