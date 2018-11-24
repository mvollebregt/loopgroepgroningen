import {Injectable} from '@angular/core';
import {Credentials, Session} from '../../api';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {WachtwoordkluisService} from './wachtwoordkluis.service';
import {VraagOmCredentialsService} from './vraag-om-credentials.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
        switchMap(() => retryFunction())
      ));
  }

  private verkrijgLogin<T>(errorResponse: HttpErrorResponse): Observable<Session> {
    return this.wachtwoordkluis.haalCredentialsOp().pipe(
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
            // tap wordt alleen uitgevoerd bij een succesvolle login en niet wanneer de Observable in een 401-fout komt
            tap(() => this.wachtwoordkluis.slaCredentialsOp(credentials)),
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
    return this.http.post<Session>(this.urlResolver.urlFor('session'), credentials, {withCredentials: true});
  }
}
