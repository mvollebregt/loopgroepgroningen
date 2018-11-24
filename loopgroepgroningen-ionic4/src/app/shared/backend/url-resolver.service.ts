import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UrlResolverService {

  urlFor(relativeUrl: string): string {
    const serverNameIndex = relativeUrl.indexOf('loopgroepgroningen.nl/');
    const normalizedUrl = serverNameIndex === -1 ? relativeUrl : relativeUrl.substring(serverNameIndex + 'loopgroepgroningen.nl/'.length);
    const separator = normalizedUrl.startsWith('/') ? '' : '/';
    return environment.api + separator + normalizedUrl;
  }
}
