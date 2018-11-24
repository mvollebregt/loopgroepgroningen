import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UrlResolverService} from './url-resolver.service';
import {UnauthorizedHandlerService} from '../services/unauthorized-handler.service';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(
    private http: HttpClient,
    private urlResolver: UrlResolverService,
    private unauthorizedHandler: UnauthorizedHandlerService
  ) {
  }

  public get<T>(relativeUrl: string, params: any = {}): Observable<T> {
    return this.http.get<T>(this.urlResolver.urlFor(relativeUrl), {withCredentials: true, params}).pipe(
      this.unauthorizedHandler.unauthorizedHandlerFor(() => this.get<T>(relativeUrl, params)));
  }

  public post<T>(relativeUrl: string, body: any): Observable<T> {
    return this.http.post<T>(this.urlResolver.urlFor(relativeUrl), body, {withCredentials: true}).pipe(
      this.unauthorizedHandler.unauthorizedHandlerFor(() => this.post<T>(relativeUrl, body)));
  }
}
