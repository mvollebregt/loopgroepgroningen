import {Observable} from "rxjs/Observable";

export interface AbstractHttp {

  get(relativeUrl: string) : Observable<string>

  post(relativeUrl: string, formObject: string): Observable<string>

}
