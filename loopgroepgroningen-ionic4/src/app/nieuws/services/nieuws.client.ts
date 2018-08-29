import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/services/http.service';
import {Credentials, Nieuwsbericht, Session} from '../../api';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NieuwsClient {

  constructor(private httpService: HttpService
              // private loginService: LoginService
  ) {
  }

  getLaatsteNieuws(): Observable<{ nieuws: Nieuwsbericht[], meldingen: string[] }> {
    const login: Credentials = {username: 'u', password: 'p'};
    return this.httpService.post<Session>('session', login).pipe(
      tap(console.log),
      switchMap(() => this.httpService.get<{ nieuws: Nieuwsbericht[], meldingen: string[] }>('laatsteNieuws')),
      tap(console.log)
    );
  }

}
