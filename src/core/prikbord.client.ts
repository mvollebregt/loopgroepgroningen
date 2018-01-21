import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {Bericht} from "./bericht";
import * as moment from 'moment';
import {HttpService} from "./http.service";

@Injectable()
export class PrikbordClient {

    constructor(private httpService: HttpService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get('index.php/prikbord', 'div.easy_frame', PrikbordClient.toBericht);
  }

  private static toBericht(node: Element): Bericht {
    let auteur = node.querySelector('.easy_big').textContent.trim();
    let tijdstip = moment(node.querySelector('.easy_small').textContent.trim(), "dddd DD MMMM YYYY HH:mm");
    let childNodes = node.querySelector('.easy_content').childNodes;
    let berichttekst: string[] = [];
    let lineBreaks = 0;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType === Node.TEXT_NODE) {
        if (lineBreaks > 1 && berichttekst.length) {
          berichttekst.push('');
        }
        berichttekst.push(childNodes[i].textContent.trim());
        lineBreaks = 0;
      } else {
        lineBreaks++;
      }
    }
    return {
      auteur: auteur,
      tijdstip: tijdstip.format(),
      berichttekst: berichttekst
    }
  }
}
