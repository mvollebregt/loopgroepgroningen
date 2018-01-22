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
    this.baseUrl = platform.url().startsWith('file:') ? 'http://www.loopgroepgroningen.nl' : '';
  }

  public get(relativeUrl: string): Observable<string> {
    return this.http.get(this.urlFor(relativeUrl), {responseType: 'text'});
  }

  public post(relativeUrl: string, formSelector: string, params: any, guard?: (formObject: any) => boolean): Observable<string> {
    return this
      .getFormInputs(relativeUrl, formSelector)
      .switchMap(source => {
        if (guard && !guard(source)) {
          return Observable.of('');
        } else {
          let formData = new FormData();
          copyToFormData(source, formData);
          copyToFormData(params, formData);
          return this.http.post(this.urlFor(relativeUrl), formData, {responseType: 'text'});
        }
      });
  }

  public extract<T>(selector: string, mapToObject: (node: Element) => T): (html: string) => T[] {
    return (html: string) => {
      let doc = this.parser.parseFromString(html, 'text/html');
      let elements: NodeListOf<Element> = doc.querySelectorAll(selector);
      let objects: T[] = [];
      for (let i = 0; i < elements.length; i++) {
        objects.push(mapToObject(elements.item(i)))
      }
      return objects;
    }
  }

  private urlFor(relativeUrl: string) {
    const separator = relativeUrl.startsWith('/') ? '' : '/';
    return this.baseUrl + separator + relativeUrl;
  }

  private getFormInputs(relativeUrl: string, formSelector: string): Observable<any> {
    return this
      .get(relativeUrl)
      .map(this.extract(`${formSelector} input`, toParam))
      .map(keyValuePairs => {
        const formObject = {};
        for (let keyValuePair of keyValuePairs) {
          formObject[keyValuePair[0]] = keyValuePair[1];
        }
        return formObject;
      });
  }
}

function copyToFormData(params: any, formData: FormData) {
  for (const property in params) {
    if (params.hasOwnProperty(property)) {
      formData.append(property, params[property]);
    }
  }
}

function toParam(node: Element): [string, string] {
  return [node.attributes['name'].value, node.attributes['value'] && node.attributes['value'].value];
}

