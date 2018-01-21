import {Injectable} from "@angular/core";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs/Observable";
import {Evenement} from './evenement';
import * as moment from 'moment';

@Injectable()
export class AgendaClient {

  constructor(private httpService: HttpService) {
  }

  haalEvenementenOp(): Observable<Evenement[]> {
    // TODO: evenementen automatisch samen ophalen met prikbord?
    return this.httpService.get('index.php/prikbord').map(
      this.httpService.extract('li.jemmod', AgendaClient.toEvenement)
    )
  }

  private static toEvenement(elt: Element): Evenement {
    const alleDatums = elt.querySelectorAll('.jem_date-1');
    const alleTijden = elt.querySelectorAll('.jem_time-1');
    const link = elt.querySelector('a');
    return {
      start: AgendaClient.toISOString(alleDatums.item(0), alleTijden.item(0)),
      einde: AgendaClient.toISOString(alleDatums.item(alleDatums.length - 1), alleTijden.item(alleTijden.length - 1)),
      naam: link.textContent.trim(),
      url: link.getAttribute('href')
    };
  }

  private static toISOString(datum: Element, tijd: Element): string {
    return moment(`${datum.textContent.trim()} ${tijd.textContent.trim()}`, "DD MMM YYYY HH:mm").toISOString();
  }
}
