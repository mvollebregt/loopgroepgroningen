import {Injectable} from "@angular/core";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login.service";
import {Contact} from './contact';

@Injectable()
export class LedenlijstClient {

  constructor(private httpService: HttpService, private loginService: LoginService) {
  }

  haalLedenOp(): Observable<any> {
    return this.loginService
      .login()
      .switchMap(() =>
        this.httpService.get(
          'index.php/loopgroep-groningen-ledeninfo/loopgroep-groningen-ledenlijst',
          '.contact-category li',
          LedenlijstClient.toContact
        )
      );
  }

  private static toContact(elt: Element) {
    const content = elt.querySelectorAll('div');
    const title = content.item(0).querySelectorAll(".list-title a");
    const body = content.item(1);
    let contact : Contact = {
      naam: title.item(0).textContent.trim(),
      email: null // title.item(1).textContent.trim()
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
}
