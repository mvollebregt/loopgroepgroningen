import {Injectable} from '@angular/core';
import {Credentials, Session} from '../../../api';
import {EMPTY, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {WachtwoordkluisService} from './wachtwoordkluis.service';
import {VraagOmCredentialsService} from './vraag-om-credentials.service';
import {HttpClient} from '@angular/common/http';
import {UrlResolverService} from './url-resolver.service';

@Injectable({providedIn: 'root'})
export class UnauthorizedHandlerService {

  constructor(
    private http: HttpClient,
    private urlResolver: UrlResolverService,
    private wachtwoordkluis: WachtwoordkluisService,
    private vraagOmCredentialsService: VraagOmCredentialsService) {
  }

  unauthorizedHandlerFor<T>(retryFunction: () => Observable<T>) {
    return this.catchUnauthorized(err =>
      this.verkrijgLogin(err).pipe(
        // TODO: retryFunction vervangen door 'caught' argument (tweede argument van error handler?)
        switchMap(() => retryFunction())
      ))
  }

  private verkrijgLogin<T>(err: any): Observable<Session> {
    return this.wachtwoordkluis.haalCredentialsOp().pipe(
      switchMap(opgeslagenCredentials => {
        const probeerLogin = opgeslagenCredentials ? this.login(opgeslagenCredentials) : throwError(err);
        return probeerLogin.pipe(
          this.catchUnauthorized(err => this.vraagOmCredentials<T>(opgeslagenCredentials, err.message)))
      })
    );
  }

  private vraagOmCredentials<T>(oudeCredentials: Credentials, melding: string): Observable<Session> {
    return this.vraagOmCredentialsService.vraagOmCredentials(oudeCredentials, melding).pipe(
      switchMap(credentials => {
        if (!credentials) {
          return EMPTY;
        } else {
          return this.login(credentials).pipe(
            this.catchUnauthorized(err => this.vraagOmCredentials<T>(credentials, err.message)),
            // TODO: als je drie keer het wachtwoord intypt wordt het uiteindelijk ook drie keer opgeslagen!
            tap(() => console.log('login opslaan!')),
            tap(() => this.wachtwoordkluis.slaCredentialsOp(credentials)))
        }
      })
    )
  }

  private catchUnauthorized<T>(errorHandler: (err) => Observable<T>) {
    return catchError<T, T>(err => {
      if (err.status !== 401) {
        return throwError(err);
      } else {
        return errorHandler(err);
      }
    })
  }

  private login(credentials: Credentials): Observable<Session> {
    return this.http.post<Session>(this.urlResolver.urlFor('session'), credentials, {withCredentials: true});
  }
}
