import * as WebRequest from 'web-request';
import * as moment from 'moment';


export class SingleUseCookieJar implements WebRequest.CookieJar {

  private cookies: {[key: string]: string} = {};

  constructor() {
    // zet default cookie
    // TODO: dit niet naar de client sturen?
    // TODO: cookie path zetten?
    // TODO: idea... cookie ook niet naar client? en accept cookies cookie?
    const today = moment();
    const nextYear = moment().add(1, 'year');
    const format = 'YYYY-MM-DD';
    this.setCookie(`plg_system_eprivacy=${today.format(format)}x${nextYear.format(format)}x`);
  }

  setCookie(cookie: WebRequest.Cookie | string): void {
    const cookieString = this.isCookie(cookie) ? cookie.str : cookie;
    const equalsIndex = cookieString.indexOf('=');
    const cookieName = cookieString.substring(0, equalsIndex);
    this.cookies[cookieName] = cookieString;
  }

  // Geeft de juiste cookie string terug voor de cookie-header van het request
  getCookieString(): string {
    const cookieString = Object.keys(this.cookies).map(cookieName => {
      const fullCookieString = this.cookies[cookieName];
      const semicolonIndex = fullCookieString.indexOf(';');
      return fullCookieString.substring(0, semicolonIndex > -1 ? semicolonIndex : fullCookieString.length);
    }).join('; ');
    return cookieString;
  }

  getResponseCookies(): string[] {
    return Object.keys(this.cookies)
      .map(cookieName => this.cookies[cookieName])
      .filter(cookieString => cookieString.indexOf(';') > -1);
  }

  getCookies(): WebRequest.Cookie[] {
    throw new Error('SingleUseCookieJar.getCookies is not implemented');
  }

  private isCookie(cookie: WebRequest.Cookie | string): cookie is WebRequest.Cookie {
    return (<WebRequest.Cookie> cookie).str !== undefined;
  }
}
