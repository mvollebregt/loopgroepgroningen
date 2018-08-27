import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Observable, of, pipe} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, retry, switchMap, tap} from 'rxjs/operators';
import {FormDetails} from '../models/form-details';

@Injectable({providedIn: 'root'})
export class HttpService {

  static readonly backendUrl = 'http://localhost:5000/loopgroep-groningen-v3/us-central1';
  // static readonly backendUrl = 'https://us-central1-loopgroep-groningen-v3.cloudfunctions.net/';

  private readonly baseUrl: string;
  private readonly parser = new DOMParser();
  private cookiesAccepted = true;

  constructor(platform: Platform, private http: HttpClient) {
    this.baseUrl = HttpService.backendUrl;
  }

  public get<T>(relativeUrl: string): Observable<T> {
    return this.acceptCookies().pipe(
      switchMap(() => this.http.get<T>(this.urlFor(relativeUrl), {withCredentials: true})),
      tap((response: string) => this.checkMeldingen(response))
    );
  }

  public post(relativeUrl: string, formSelector: string, params: any, action?: string): Observable<string> {
    return this.get(relativeUrl).pipe(
      this.postAfterGet(relativeUrl, formSelector, params, action)
    );
  }

  public postAfterGet(relativeUrl: string, formSelector: string, params: any, action?: string) {
    return pipe(
      this.extractWithRetry(formSelector, toFormDetails),
      map(formsArray => formsArray[0]),
      switchMap((form: FormDetails) => {
        const formData = new FormData();
        copyToFormData(form.inputs, formData);
        copyToFormData(params, formData);
        return this.http.post(this.urlFor(action ? action : form.action ? form.action : relativeUrl), formData, {
          responseType: 'text',
          withCredentials: true
        });
      }),
      tap((response: string) => this.checkMeldingen(response))
    );
  }

  private acceptCookies(): Observable<string> {
    if (!this.cookiesAccepted) {
      const cookiesForm = 'index.php?option=com_ajax&plugin=eprivacy&format=raw&method=accept&consent=&country=not+detected';
      return this.http.get(this.urlFor(cookiesForm), {
        responseType: 'text',
        withCredentials: true
      }).pipe(
        tap(response => {
          this.cookiesAccepted = true;
        })
      );
    } else {
      return of('');
    }
  }

  private extract<T>(
    selector: string,
    mapToObject: (node: Element, volgnummer: number) => T,
    throwErrorIfEmpty: boolean
  ): (html: string) => T[] {
    return (html: string) => {
      const doc = this.parser.parseFromString(html, 'text/html');
      const elements: NodeListOf<Element> = doc.querySelectorAll(selector);
      if (throwErrorIfEmpty && elements.length === 0) {
        throw new Error('Er ging iets mis in de communicatie met de server.');
      }
      const objects: T[] = [];
      for (let i = 0; i < elements.length; i++) {
        objects.push(mapToObject(elements.item(i), i));
      }
      return objects;
    };
  }

  public extractWithRetry<T>(selector: string, mapToObject: (node: Element, volgnummer: number) => T) {
    return pipe(
      map(this.extract(selector, mapToObject, true)),
      retry(2) // TODO: iets geavanceerder retry-mechanisme maken?
    );
  }

  public extractWithRetryKeepingResponse<T>(selector: string, mapToObject: (node: Element) => T) {
    return pipe(
      map((response: string) => [this.extract(selector, mapToObject, true)(response), response]),
      retry(3)
    );
  }

  private urlFor(relativeUrl: string) {
    const serverNameIndex = relativeUrl.indexOf('loopgroepgroningen.nl/');
    const normalizedUrl = serverNameIndex === -1 ? relativeUrl : relativeUrl.substring(serverNameIndex + 'loopgroepgroningen.nl/'.length);
    const separator = normalizedUrl.startsWith('/') ? '' : '/';
    return this.baseUrl + separator + normalizedUrl;
  }

  private checkMeldingen(response: string): void {
    // TODO: warnings worden nu behandeld als fout. Moeten we nog (iets anders) doen met info-meldingen?
    const meldingen = this.extract('#system-message-container .warning li', node => node.textContent.trim(), false)(response);
    if (meldingen.length > 0) {
      throw meldingen;
    }
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
  const inputValues = {};
  for (let i = 0; i < inputElements.length; i++) {
    const subnode = inputElements.item(i);
    inputValues[subnode.attributes['name'].value] = subnode.attributes['value'] && subnode.attributes['value'].value;
  }
  return {
    action: node.getAttribute('action'),
    inputs: inputValues
  };
}

