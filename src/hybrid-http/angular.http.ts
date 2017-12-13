import {AbstractHttp} from "./abstract.http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AngularHttp implements AbstractHttp {

  constructor(private http: HttpClient) {

  }

  get(relativeUrl: string): Observable<string> {
    return this.http.get(this.urlFor(relativeUrl), {responseType: 'text'});
    // .catch(error => {
    //     if (PrikbordClient.isCorsError(error)) {
    //       return this.http
    //         .get(`/proxy/${relativeUrl}`, {responseType: 'text'})
    //         .catch(() => Observable.of(''));
    //     } else {
    //       return Observable.of('');
    //     }
    //   }
    // )

  }

  post(relativeUrl: string, formObject: string): Observable<string> {
    return this.http.post(this.urlFor(relativeUrl), formObject, {responseType: 'text'});
  }

  private urlFor(relativeUrl: string): string {
    return relativeUrl;
  }


  // private static isCorsError(response: HttpErrorResponse) {
  //   return response.status === 0;
  // }

}
