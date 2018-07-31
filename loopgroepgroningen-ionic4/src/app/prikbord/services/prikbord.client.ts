import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Bericht} from './bericht';
import * as moment from 'moment';
import {HttpService} from './http.service';
import {LoginService} from './login/login.service';
import {switchMap} from 'rxjs/operators';
import {toParagraaf} from '../shared/rich-content/poor-content/to-paragraaf';

@Injectable()
export class PrikbordClient {

  constructor(private httpService: HttpService,
              private loginService: LoginService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get('index.php/prikbord').pipe(
      this.httpService.extractWithRetry('div.easy_frame', PrikbordClient.toBericht)
    );
  }

  verstuurBericht(berichttekst: string): Observable<Bericht[]> {
    return this.loginService
      .login().pipe(
        switchMap(() =>
          this.httpService.post(
            'index.php/prikbord/entry/add',
            'form[name=\'gbookForm\']',
            {gbtext: berichttekst}).pipe(
            this.httpService.extractWithRetry('div.easy_frame', PrikbordClient.toBericht)
          )
        )
      )
  }

  private static toBericht(node: Element): Bericht {
    let auteur = node.querySelector('.easy_big').textContent.trim();
    let tijdstip = moment(node.querySelector('.easy_small').textContent.trim(), "dddd DD MMMM YYYY HH:mm");
    let content = node.querySelector('.easy_content');
    return {
      auteur: auteur,
      tijdstip: tijdstip.format('YYYY-MM-DDTHH:mm'),
      berichttekst: toParagraaf(content)
    }
  }
}
