import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as moment from 'moment';
import {Nieuwsbericht} from './nieuwsbericht';
import {LoginService} from '../../../core/login/login.service';
import {HttpService} from '../../../core/http.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class NieuwsClient {

  constructor(private httpService: HttpService,
              private loginService: LoginService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalNieuwsberichtenOp(): Observable<Nieuwsbericht[]> {
    return this.loginService.login().pipe(
      switchMap(() =>
        this.httpService.get('index.php/loopgroep-groningen-ledeninfo/laatste-nieuws').pipe(
          this.httpService.extractWithRetry('*[itemprop=blogPost] .loopgroepgroningen-post', NieuwsClient.toNieuwsbericht)
        ))
    );
  }

  private static toNieuwsbericht(node: Element): Nieuwsbericht {
    console.log(node);
    const titel = node.querySelector('.loopgroepgroningen-postheader').textContent.trim();
    let samenvatting = node.querySelector('.loopgroepgroningen-postcontent').textContent.trim().substring(0, 100);
    samenvatting = samenvatting.substring(samenvatting.indexOf('\n'));
    const plaatje = 'http://www.loopgroepgroningen.nl' + node.querySelector('img').getAttribute('src');
    const datum = moment(node.querySelector('strong').textContent.trim(), "DD/MM/YYYY").format('YYYY-MM-DD');
    return {
      titel,
      samenvatting,
      plaatje,
      datum
    }
  }
}
