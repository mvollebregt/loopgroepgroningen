import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {AbstractHttp} from "./abstract-http";
import {CordovaHttp} from "./cordova.http";
import {Observable} from "rxjs/Observable";
import {AngularHttp} from "./angular-http";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

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

  public post(relativeUrl: string, formSelector: string, params: any, guard?: (formData: FormData) => boolean): Observable<any> {
    return this
      .getFormInputs(relativeUrl, formSelector)
      .switchMap(formData => {
        if (guard && !guard(formData)) {
          return Observable.of('');
        } else {
          for (const property in params) {
            if (params.hasOwnProperty(property)) {
              formData.set(property, params[property]);
            }
          }
          return this.http.post(relativeUrl, formData);
        }
      });
  }

  private getFormInputs(relativeUrl: string, formSelector: string): Observable<FormData> {
    return this
      .get(relativeUrl, `//form[${formSelector}]//input`, HttpService.toParam)
      .map(keyValuePairs => {
        const formData = new FormData();
        for (let keyValuePair of keyValuePairs) {
          formData.set(keyValuePair[0], keyValuePair[1]);
        }
        return formData;
      });
  }

  private static toParam(doc: Document, node: Node): [string, string] {
    return [node.attributes['name'].value, node.attributes['value'] && node.attributes['value'].value];
  }
}
