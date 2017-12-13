import {AbstractHttp} from "./abstract.http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AngularHttp implements AbstractHttp {

  constructor(private http: HttpClient) {

  }

  get(relativeUrl: string): Observable<string> {
    return this.http.get(`/proxy/${relativeUrl}`, {responseType: 'text'});
  }

}
