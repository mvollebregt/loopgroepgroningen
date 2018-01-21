import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {Bericht} from "./bericht";
import * as moment from 'moment';
import {HttpService} from "./http.service";
import {toParagraaf} from './to-paragraaf';

@Injectable()
export class PrikbordClient {

    constructor(private httpService: HttpService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get('index.php/prikbord').map(
      this.httpService.extract('div.easy_frame', PrikbordClient.toBericht));
  }

  private static toBericht(node: Element): Bericht {
    let auteur = node.querySelector('.easy_big').textContent.trim();
    let tijdstip = moment(node.querySelector('.easy_small').textContent.trim(), "dddd DD MMMM YYYY HH:mm");
    let content = node.querySelector('.easy_content');
    return {
      auteur: auteur,
      tijdstip: tijdstip.format(),
      berichttekst: toParagraaf(content)
    }
  }
}
