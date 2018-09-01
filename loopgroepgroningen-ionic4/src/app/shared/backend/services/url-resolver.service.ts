import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UrlResolverService {

  private readonly baseUrl = 'http://localhost:5000/loopgroep-groningen-v3/us-central1';

  // private readonly baseUrl = 'https://us-central1-loopgroep-groningen-v3.cloudfunctions.net/';

  urlFor(relativeUrl: string): string {
    const serverNameIndex = relativeUrl.indexOf('loopgroepgroningen.nl/');
    const normalizedUrl = serverNameIndex === -1 ? relativeUrl : relativeUrl.substring(serverNameIndex + 'loopgroepgroningen.nl/'.length);
    const separator = normalizedUrl.startsWith('/') ? '' : '/';
    return this.baseUrl + separator + normalizedUrl;
  }
}
