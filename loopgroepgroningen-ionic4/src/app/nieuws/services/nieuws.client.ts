import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/http.service';
import {Nieuwsbericht} from '../../api';

@Injectable({providedIn: 'root'})
export class NieuwsClient {

  constructor(private httpService: HttpService) {
  }

  getLaatsteNieuws(): Observable<Nieuwsbericht[]> {
    return this.httpService.get<Nieuwsbericht[]>('laatsteNieuws');
  }
}
