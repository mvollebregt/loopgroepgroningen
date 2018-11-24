import {Injectable} from '@angular/core';
import {Credentials, Session} from '../../api';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {VraagOmCredentialsService} from '../backend/vraag-om-credentials.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UrlResolverService} from '../backend/url-resolver.service';
import {CoreState} from '../store/core.state';
import {select, Store} from '@ngrx/store';
import {getAuthenticatieCredentials} from '../store/authenticatie/authenticatie.state';
import {anonymousUserCredentials} from '../backend/models/anonymous-user-credentials';
import {anonymousUserSession} from '../backend/models/anonymous-user-session';

@Injectable({providedIn: 'root'})
export class UnauthorizedHandlerService {

  constructor(
    private http: HttpClient,
    private store: Store<CoreState>,
    private urlResolver: UrlResolverService,
    private vraagOmCredentialsService: VraagOmCredentialsService) {
  }

  unauthorizedHandlerFor<T>(retryFunction: () => Observable<T>) {
    return this.catchUnauthorized(err =>
      this.verkrijgLogin(err).pipe(
        switchMap(() => retryFunction())
      ));
  }

  private verkrijgLogin<T>(errorResponse: HttpErrorResponse): Observable<Session> {
    return this.store.pipe(select(getAuthenticatieCredentials)).pipe(
      switchMap(opgeslagenCredentials => {
        const probeerLogin = opgeslagenCredentials ? this.login(opgeslagenCredentials) : throwError(errorResponse);
        return probeerLogin.pipe(
          this.catchUnauthorized(err => this.vraagOmCredentials<T>(opgeslagenCredentials, err)));
      })
    );
  }

  private vraagOmCredentials<T>(oudeCredentials: Credentials, errorResponse: HttpErrorResponse): Observable<Session> {
    return this.vraagOmCredentialsService.vraagOmCredentials(oudeCredentials, errorResponse).pipe(
      switchMap(credentials => {
          return this.login(credentials).pipe(
            this.catchUnauthorized(err => this.vraagOmCredentials<T>(credentials, err))
          );
      })
    );
  }

  private catchUnauthorized<T>(errorHandler: (err) => Observable<T>) {
    return catchError<T, T>(err => {
      if (err.status !== 401) {
        return throwError(err);
      } else {
        return errorHandler(err);
      }
    });
  }

  login(credentials: Credentials): Observable<Session> {
    if (credentials.username === anonymousUserCredentials.username && credentials.password === anonymousUserCredentials.password) {
      return of(anonymousUserSession);
    } else {
      return this.http.post<Session>(this.urlResolver.urlFor('session'), credentials, {withCredentials: true});
    }
  }
}
