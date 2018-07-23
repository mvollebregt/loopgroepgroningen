import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as moment from 'moment';
import {Nieuwsbericht} from './nieuwsbericht';
import {LoginService} from '../../../core/login/login.service';
import {HttpService} from '../../../core/http.service';
import {switchMap} from 'rxjs/operators';
import {RichContentService} from '../../../shared/rich-content/shared/rich-content.service';
import {Paragraaf, RichContentType} from '../../../shared/rich-content/shared/rich-content';

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
    const content = this.richContentService
      .extractRichContent(node.querySelector('.loopgroepgroningen-article'))
      .slice(1); // de eerste paragraaf is de datum, die laten we weg
    const samenvatting = content
      .filter(child => child.type === RichContentType.PARAGRAAF)
      .map((paragraaf: Paragraaf) => paragraaf.tekst)
      .join(' ').substring(0, 50).trim();
    const thumbnail = node.querySelector('img').getAttribute('src');
    const datum = moment(node.querySelector('strong').textContent.trim(), "DD/MM/YYYY").format('YYYY-MM-DD');
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
