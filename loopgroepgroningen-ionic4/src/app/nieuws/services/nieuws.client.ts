import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/services/http.service';
import {LoginRequest, LoginResponse, Nieuwsbericht} from '../../api';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NieuwsClient {

  constructor(private httpService: HttpService
              // private loginService: LoginService
  ) {
  }

  getLaatsteNieuws(): Observable<{ nieuws: Nieuwsbericht[], meldingen: string[] }> {
    const login: LoginRequest = {username: 'u', password: 'p'};
    return this.httpService.post<LoginResponse>('login', login).pipe(
      tap(console.log),
      switchMap(() => this.httpService.get<{ nieuws: Nieuwsbericht[], meldingen: string[] }>('laatsteNieuws')),
      tap(console.log)
    );
  }

}
