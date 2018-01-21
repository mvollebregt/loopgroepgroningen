import {Injectable} from "@angular/core";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login.service";
import {Evenementdetail} from './evenementdetail';
import {toParagraaf} from '../../core/to-paragraaf';

@Injectable()
export class EvenementdetailClient {

  constructor(private httpService: HttpService, private loginService: LoginService) {
  }

  haalEvenementOp(url: string): Observable<Evenementdetail> {
    return this.loginService
      .login()
      .switchMap(() =>
        this.httpService.get(url)
          .map(this.httpService.extract('#jem', EvenementdetailClient.toEvenementdetail))
          .map(array => array[0])
      );
  }

  private static toEvenementdetail(elt: Element) : Evenementdetail {
    const start = elt.querySelector('[itemprop="startDate"]').getAttribute('content');
    const einde = elt.querySelector('[itemprop="endDate"]').getAttribute('content');
    const naam = elt.querySelector('[itemprop="name"]').textContent.trim();
    const categorie = elt.querySelector('dd.category').textContent.trim();
    const omschrijving = toParagraaf(elt.querySelector('[itemprop="description"]'));

    const deelnemerElementen = elt.querySelectorAll('.register li .username');
    let deelnemers: string[] = [];
    for (let i = 0; i < deelnemerElementen.length; i++) {
      deelnemers.push(deelnemerElementen.item(i).textContent.trim());
    }

    const deelname = true; //elt.querySelector('.register form [name="reg_check"]').getAttribute('value');

    return {
      start: start,
      einde: einde,
      naam: naam,
      categorie: categorie,
      omschrijving: omschrijving,
      deelname: deelname,
      deelnemers: deelnemers
    };
  }
}
