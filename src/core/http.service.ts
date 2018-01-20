import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  private readonly baseUrl: string;
  private readonly parser = new DOMParser();

  constructor(platform: Platform, private http: HttpClient) {
    // Op een echt device moeten we naar de absolute URL toe. Binnen de browser maken we gebruik van een proxy.
    this.baseUrl = platform.is('cordova') ? 'http://www.loopgroepgroningen.nl/' : '';
  }

  // TODO: gebruik get met css selector hieronder
  public getXPath<T>(relativeUrl: string, xpath: string, mapToObject: (doc: Document, node: Node) => T): Observable<any> {
    return this.http
      .get(this.baseUrl + relativeUrl, {responseType: 'text'})
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

  public get<T>(relativeUrl: string, selector: string, mapToObject: (node: Element) => T): Observable<any> {
    return this.http
      .get(this.baseUrl + relativeUrl, {responseType: 'text'})
      .map(data => {
          let doc = this.parser.parseFromString(data, 'text/html');
          let elts :NodeListOf<Element> = doc.querySelectorAll(selector);
          let objects: T[] = [];
          for (let i=0; i < elts.length; i++) {
            objects.push(mapToObject(elts.item(i)))
          }
          return objects;
        }
      );
  }

  // TODO: gebruik post met CSS selector
  public postXpath(relativeUrl: string, formSelector: string, params: any, guard?: (formObject: any) => boolean): Observable<any> {
    return this
      .getFormInputs(relativeUrl, formSelector)
      .switchMap(source => {
        if (guard && !guard(source)) {
          return Observable.of('');
        } else {
          let formData = new FormData();
          this.copyToFormData(source, formData);
          this.copyToFormData(params, formData);
          return this.http.post(this.baseUrl + relativeUrl, formData, {responseType: 'text'});
        }
      });
  }

  // TODO: gebruik post met CSS selector
  private getFormInputs(relativeUrl: string, formSelector: string): Observable<any> {
    return this
      .getXPath(relativeUrl, `//form[${formSelector}]//input`, HttpService.toParam)
      .map(keyValuePairs => {
        const formObject = {};
        for (let keyValuePair of keyValuePairs) {
          formObject[keyValuePair[0]] = keyValuePair[1];
        }
        return formObject;
      });
  }

  private copyToFormData(params: any, formData: FormData) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        formData.append(property, params[property]);
      }
    }
  }

  private static toParam(doc: Document, node: Node): [string, string] {
    return [node.attributes['name'].value, node.attributes['value'] && node.attributes['value'].value];
  }
}
