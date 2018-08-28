import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {WachtwoordkluisService} from './wachtwoordkluis.service';
import {Credentials, Session} from '../../../api';

@Injectable({providedIn: 'root'})
export class HttpService {

  private readonly baseUrl = 'http://localhost:5000/loopgroep-groningen-v3/us-central1';

  // private readonly baseUrl = 'https://us-central1-loopgroep-groningen-v3.cloudfunctions.net/';

  constructor(
    private http: HttpClient,
    private wachtwoordkluis: WachtwoordkluisService
  ) {
  }

  public get<T>(relativeUrl: string): Observable<T> {
    return this.http.get<T>(this.urlFor(relativeUrl), {withCredentials: true}).pipe(
      this.unauthorizedHandlerFor(() => this.get<T>(relativeUrl)));
  }

  public post<T>(relativeUrl: string, body: any): Observable<T> {
    return this.http.post<T>(this.urlFor(relativeUrl), body, {withCredentials: true}).pipe(
      this.unauthorizedHandlerFor(() => this.post<T>(relativeUrl, body)));
  }

  private unauthorizedHandlerFor<T>(retryFunction: () => Observable<T>) {
    return this.catchUnauthorized(() =>
      this.verkrijgLogin().pipe(
        switchMap(retryFunction)
      ))
  }

  private verkrijgLogin<T>(): Observable<Credentials> {
    return this.wachtwoordkluis.haalLoginOp().pipe(
      switchMap(this.login),
      this.catchUnauthorized(() => this.vraagOmLogin<T>())
    );
  }

  private vraagOmLogin<T>(): Observable<Credentials> {
    return this.askForLogin().pipe(
      filter(login => !!login),
      switchMap(this.login),
      this.catchUnauthorized(() => this.vraagOmLogin<T>())
    )
  }

  private catchUnauthorized<T>(errorHandler: () => Observable<T>) {
    return catchError<T, T>(error => {
      if (error.status !== 401) {
        return throwError(error);
      } else {
        return errorHandler();
      }
    })
  }

  private urlFor(relativeUrl: string) {
    const serverNameIndex = relativeUrl.indexOf('loopgroepgroningen.nl/');
    const normalizedUrl = serverNameIndex === -1 ? relativeUrl : relativeUrl.substring(serverNameIndex + 'loopgroepgroningen.nl/'.length);
    const separator = normalizedUrl.startsWith('/') ? '' : '/';
    return this.baseUrl + separator + normalizedUrl;
  }

  private askForLogin(): Observable<Credentials> {
    return null;
  }


  login(credentials: Credentials): Observable<Session> {
    return this.post<Session>('session', credentials);
  }
}
