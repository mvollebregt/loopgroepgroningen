import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {Bericht} from "./bericht";
import * as moment from 'moment';

@Injectable()
export class PrikbordProvider {

  private readonly parser = new DOMParser();

  constructor(private http: HttpClient) {
  }

  haalBerichtenOp() : Observable<any> {
    return this.http
      .get(`http://www.loopgroepgroningen.nl/index.php/prikbord`, {responseType: 'text'})
      .catch(error => {
          if (PrikbordProvider.isCorsError(error)) {
            return this.http
              .get('/proxy/index.php/prikbord',  {responseType: 'text'})
              .catch(() => Observable.of(''));
          } else {
            return Observable.of('');
          }
        }
      )
      .map(html => {
        let doc = this.parser.parseFromString(html, 'text/html');
        let elts = doc.evaluate('//div[@class="easy_frame"]', doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        let berichten : Bericht[] = [];
        let node : Node;
        while (node = elts.iterateNext()) {
          berichten.push(PrikbordProvider.toBericht(doc, node))
        }
        return berichten.reverse();
      })
  }

  private static isCorsError(response: HttpErrorResponse) {
    return response.status === 0;
  }

  private static toBericht(doc: Document, node: Node) : Bericht {
    let auteur = doc.evaluate('.//*[@class="easy_big"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim();
    let tijdstip = moment(doc.evaluate('.//*[@class="easy_small"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim(), "dddd DD MMMM YYYY HH:mm");
    let childNodes = doc.evaluate('.//*[@class="easy_content"]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.childNodes;
    let berichttekst : string[] = [];
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
      tijdstip: tijdstip,
      berichttekst: berichttekst
    }
  }

}
