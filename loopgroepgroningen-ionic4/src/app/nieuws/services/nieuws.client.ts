import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/services/http.service';
import {Nieuwsbericht} from '../../api';

@Injectable({providedIn: 'root'})
export class NieuwsClient {

  constructor(private httpService: HttpService
              // private loginService: LoginService
  ) {
  }

  getLaatsteNieuws(): Observable<{ nieuws: Nieuwsbericht[], meldingen: string[] }> {
    return this.httpService.get<{ nieuws: Nieuwsbericht[], meldingen: string[] }>('laatsteNieuws');
  }

}
