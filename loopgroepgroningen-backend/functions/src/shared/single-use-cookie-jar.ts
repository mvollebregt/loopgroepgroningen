import * as WebRequest from 'web-request';
import * as moment from 'moment';


export class SingleUseCookieJar implements WebRequest.CookieJar {

  private cookies: {[key: string]: string} = {};

  constructor() {
    // zet default cookie
    // TODO: dit niet naar de client sturen?
    const today = moment();
    const nextYear = moment().add(1, 'year');
    const format = 'YYYY-MM-DD';
    this.cookies['plg_system_eprivacy'] = `${today.format(format)}x${nextYear.format(format)}`;
  }

  setCookie(cookie: WebRequest.Cookie | string): void {
    const cookieString = this.isCookie(cookie) ? cookie.str : cookie;
    const semicolonIndex = cookieString.indexOf(';');
    const cookieStringWithoutOptions = cookieString.substring(0, semicolonIndex> -1 ? semicolonIndex: cookieString.length);
    const equalsIndex = cookieStringWithoutOptions.indexOf('=');
    const cookieName = cookieStringWithoutOptions.substring(0, equalsIndex);
    this.cookies[cookieName] = cookieStringWithoutOptions.substring(equalsIndex + 1);
  }

  getCookieString(): string {
    return Object.keys(this.cookies).map(cookieName => `${cookieName}=${this.cookies[cookieName]}`).join('; ');
  }

  getCookies(): WebRequest.Cookie[] {
    throw new Error('SingleUseCookieJar.getCookies is not implemented');
  }

  private isCookie(cookie: WebRequest.Cookie | string): cookie is WebRequest.Cookie {
    return (<WebRequest.Cookie> cookie).str !== undefined;
  }
}
