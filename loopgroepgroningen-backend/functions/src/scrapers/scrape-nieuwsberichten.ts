import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as moment from 'moment';
import {Nieuwsbericht} from './nieuwsbericht';
import {LoginService} from '../../../core/login/login.service';
import {HttpService} from '../../../core/http.service';
import {switchMap} from 'rxjs/operators';
import {RichContentService} from '../../../shared/rich-content/shared/rich-content.service';

@Injectable()
export class NieuwsClient {

  constructor(private httpService: HttpService,
              private loginService: LoginService,
              private richContentService: RichContentService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalNieuwsberichtenOp(): Observable<Nieuwsbericht[]> {
    return this.loginService.login().pipe(
      switchMap(() =>
        this.httpService.get('index.php/loopgroep-groningen-ledeninfo/laatste-nieuws').pipe(
          this.httpService.extractWithRetry('*[itemprop=blogPost] .loopgroepgroningen-post', this.toNieuwsbericht.bind(this))
        ))
    );
  }

  private toNieuwsbericht(node: Element, volgnummer: number): Nieuwsbericht {
    const titel = node.querySelector('.loopgroepgroningen-postheader').textContent.trim();
    const datumNode = node.querySelector('strong');
    const datum = datumNode && moment(datumNode.textContent.trim(), "DD/MM/YYYY").format('YYYY-MM-DD');
    let content = this.richContentService
      .extractRichContent(node.querySelector('.loopgroepgroningen-article'));
    // als het bericht een datum heeft staat die in de eerste paragraaf, die laten we dan weg
    content = datum ? content.slice(1) : content;
    const samenvatting = this.richContentService.samenvatting(content, 50);
    const thumbnail = node.querySelector('img').getAttribute('src');
    return {
      volgnummer,
      titel,
      samenvatting,
      content,
      thumbnail,
      datum
    }
  }
}
