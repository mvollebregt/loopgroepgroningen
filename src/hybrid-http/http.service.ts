import {Injectable} from "@angular/core";
import {HTTP} from "@ionic-native/http";
import {Platform} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {AbstractHttp} from "./abstract.http";
import {CordovaHttp} from "./cordova.http";
import {Observable} from "rxjs/Observable";
import {AngularHttp} from "./angular.http";
import 'rxjs/add/operator/do';

@Injectable()
export class HttpService {

  private readonly parser = new DOMParser();
  private http: AbstractHttp;

  constructor(platform: Platform, cordovaHttp: CordovaHttp, private angularHttp: AngularHttp) {
    this.http = platform.is('cordova') ? cordovaHttp : angularHttp;
  }

  public get<T>(relativeUrl: string, xpath: string, mapToObject: (doc: Document, node: Node) => T): Observable<any> {
    return this.http
      .get(relativeUrl)
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
      .do(console.log)
      .map(data => {
          let doc = this.parser.parseFromString(data, 'text/html');
          let elts = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
          let objects: T[] = [];
          let node: Node;
          while (node = elts.iterateNext()) {
            objects.push(mapToObject(doc, node));
          }
          return objects;
        }
      );
  }

  // private static isCorsError(response: HttpErrorResponse) {
  //   return response.status === 0;
  // }

}
