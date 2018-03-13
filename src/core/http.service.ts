import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {HttpClient} from '@angular/common/http';
import {FormDetails} from './form-details';
import {map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class HttpService {

  private readonly baseUrl: string;
  private readonly parser = new DOMParser();

  constructor(platform: Platform, private http: HttpClient) {
    // Op een echt device moeten we naar de absolute URL toe. Binnen de browser maken we gebruik van een proxy.
    this.baseUrl = platform.url().startsWith('file:') ? 'http://www.loopgroepgroningen.nl' : '';
  }

  public get(relativeUrl: string): Observable<string> {
    return this.http.get(this.urlFor(relativeUrl), {responseType: 'text'}).pipe(
      tap((response: string) => this.checkMeldingen(response))
    );
  }

  public post(relativeUrl: string, formSelector: string, params: any, action?: string, guard?: (formObject: any) => boolean): Observable<string> {
    return this
      .getFormDetails(relativeUrl, formSelector).pipe(
        switchMap(([form, source]) => {
          if (guard && !guard(form.inputs)) {
            return of(source);
          } else {
            let formData = new FormData();
            copyToFormData(form.inputs, formData);
            copyToFormData(params, formData);
            return this.http.post(this.urlFor(action ? action : form.action ? form.action : relativeUrl), formData, {responseType: 'text'});
          }
        }),
        tap((response: string) => this.checkMeldingen(response))
      );
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
    const serverNameIndex = relativeUrl.indexOf('loopgroepgroningen.nl/');
    const normalizedUrl = serverNameIndex === -1 ? relativeUrl : relativeUrl.substring(serverNameIndex + 'loopgroepgroningen.nl/'.length);
    const separator = normalizedUrl.startsWith('/') ? '' : '/';
    return this.baseUrl + separator + normalizedUrl;
  }

  private checkMeldingen(response: string): void {
    // TODO: warnings worden nu behandeld als fout. Moeten we nog (iets anders) doen met info-meldingen?
    let meldingen = this.extract('#system-message-container .warning li', node => node.textContent.trim())(response);
    if (meldingen.length > 0) {
      throw meldingen;
    }
  }

  private getFormDetails(relativeUrl: string, formSelector: string): Observable<[FormDetails, string]> {
    return this.get(relativeUrl).pipe(
        map((result: string) =>
          <[FormDetails, string]> [this.extract(`${formSelector}`, toFormDetails)(result)[0], result]
        )
      )
  }
}

function copyToFormData(params: any, formData: FormData) {
  for (const property in params) {
    if (params.hasOwnProperty(property)) {
      formData.append(property, params[property]);
    }
  }
}

function toFormDetails(node: Element): FormDetails {
  const inputElements = node.querySelectorAll('input');
  let inputValues = {};
  for (let i = 0; i < inputElements.length; i++) {
    const subnode = inputElements.item(i);
    inputValues[subnode.attributes['name'].value] = subnode.attributes['value'] && subnode.attributes['value'].value;
  }
  return {
    action: node.getAttribute('action'),
    inputs: inputValues
  }
}

