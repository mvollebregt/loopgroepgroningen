import {AbstractHttp} from "./abstract.http";
import {Observable} from "rxjs/Observable";
import {HTTP, HTTPResponse} from "@ionic-native/http";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class CordovaHttp implements AbstractHttp {

  constructor(private http: HTTP) {
  }

  get(relativeUrl: string): Observable<string> {
    return Observable.fromPromise(this.http.get(`http://www.loopgroepgroningen.nl/${relativeUrl}`, {}, {})).pluck('data');
  }

}
