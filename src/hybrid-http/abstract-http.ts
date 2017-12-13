import {Observable} from "rxjs/Observable";

export interface AbstractHttp {

  get(relativeUrl: string) : Observable<string>

  post(relativeUrl: string, body: FormData): Observable<string>

}
