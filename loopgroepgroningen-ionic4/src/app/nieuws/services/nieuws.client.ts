import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/http.service';
import {Nieuwsbericht} from '../../api';

@Injectable({providedIn: 'root'})
export class NieuwsClient {

  constructor(private httpService: HttpService) {
  }

  getLaatsteNieuws(start = 0): Observable<Nieuwsbericht[]> {
    const params = {start};
    return this.httpService.get<Nieuwsbericht[]>('laatsteNieuws', params);
  }
}
