import {Observable} from "rxjs/Observable";

export interface AbstractHttp {

  get(url: string) : Observable<string>

}
