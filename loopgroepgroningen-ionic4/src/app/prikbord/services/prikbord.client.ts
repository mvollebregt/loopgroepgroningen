import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {HttpService} from '../../shared/backend/services/http.service';
import {Bericht} from '../../shared/berichten/models/bericht';
import {RichContentService} from '../../shared/rich-content/services/rich-content.service';

@Injectable({providedIn: 'root'})
export class PrikbordClient {

  constructor(private httpService: HttpService,
              private richContentService: RichContentService
              // private loginService: LoginService
  ) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get('index.php/prikbord').pipe(
      this.httpService.extractWithRetry('div.easy_frame', html => this.toBericht(html))
    );
  }

  verstuurBericht(berichttekst: string): Observable<Bericht[]> {
    // return this.loginService
    //   .login().pipe(
    //     switchMap(() =>
    //       this.httpService.post(
    //         'index.php/prikbord/entry/add',
    //         'form[name=\'gbookForm\']',
    //         {gbtext: berichttekst}).pipe(
    //         this.httpService.extractWithRetry('div.easy_frame', PrikbordClient.toBericht)
    //       )
    //     )
    //   )
    return null;
  }

  private toBericht(node: Element): Bericht {
    const auteur = node.querySelector('.easy_big').textContent.trim();
    const tijdstip = moment(node.querySelector('.easy_small').textContent.trim(), 'dddd DD MMMM YYYY HH:mm');
    const content = node.querySelector('.easy_content');
    return {
      auteur: auteur,
      tijdstip: tijdstip.format('YYYY-MM-DDTHH:mm'),
      berichttekst: this.richContentService.extractRichContent(content)
    };
  }
}
