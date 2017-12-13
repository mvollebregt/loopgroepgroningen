import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {Bericht} from "./bericht";
import * as moment from 'moment';
import {HTTP, HTTPResponse} from "@ionic-native/http";
import {HttpService} from "../hybrid-http/http.service";

@Injectable()
export class PrikbordClient {

    constructor(private httpService: HttpService) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get('index.php/prikbord', '//div[@class="easy_frame"]', PrikbordClient.toBericht);
  }

  private static toBericht(doc: Document, node: Node): Bericht {
    let auteur = doc.evaluate('.//*[@class="easy_big"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim();
    let tijdstip = moment(doc.evaluate('.//*[@class="easy_small"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim(), "dddd DD MMMM YYYY HH:mm");
    let childNodes = doc.evaluate('.//*[@class="easy_content"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.childNodes;
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
