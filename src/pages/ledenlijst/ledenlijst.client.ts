import {Injectable} from "@angular/core";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login/login.service";
import {Contact} from '../../core/contacten/contact';

@Injectable()
export class LedenlijstClient {

  constructor(private httpService: HttpService, private loginService: LoginService) {
  }

  haalLedenOp(): Observable<Contact[]> {
    return this.loginService
      .login()
      .switchMap(() => {
        return this.httpService.post(
          'index.php/loopgroep-groningen-ledeninfo/loopgroep-groningen-ledenlijst',
          '#adminForm',
          {limit: 0}
        ).map(this.httpService.extract('.contact-category li', LedenlijstClient.toContact))});
  }

  private static toContact(elt: Element) {
    const content = elt.querySelectorAll('div');
    const naam = content.item(0).querySelector(".list-title a");
    const script = content.item(0).querySelector('script');
    const body = content.item(1);
    let contact: Contact = {
      naam: naam.textContent.trim(),
      email: LedenlijstClient.decloakEmail(script.textContent)
    };
    for (let i = 0; i < body.childNodes.length; i++) {
      const childElt = body.childNodes.item(i);
      if (childElt.nodeType == Node.TEXT_NODE) {
        const childEltTrimmed = childElt.textContent.trim();
        if (childEltTrimmed.length > 0) {
          const keyVal = childElt.textContent.toLowerCase().split(':');
          contact[keyVal[0].trim()] = keyVal[1].trim();
        }
      }
    }
    return contact;
  }

  private static decloakEmail(script: string) {
    const start = script.indexOf('var addy_text');
    const end = script.indexOf(';document');
    const parts = script.substring(start, end).split('\'');
    let email = '';
    for (let i = 1; i < parts.length; i+=2) {
      email += LedenlijstClient.replaceAscii(parts[i]);
    }
    return email;
  }

  private static replaceAscii(cloaked: string) {
    let replaced = '';
    let ready = 0;
    let start = cloaked.indexOf('&');
    while (start > -1) {
      let end = cloaked.indexOf(';', ready);
      replaced +=
        cloaked.substring(ready, start) +
        String.fromCharCode(parseInt(cloaked.substring(start + 2, end)));
      ready = end + 1;
      start = cloaked.indexOf('&', ready);
    }
    replaced += cloaked.substring(ready);
    return replaced;
  }

}
