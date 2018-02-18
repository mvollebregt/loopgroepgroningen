import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {EvenementdetailClient} from './evenementdetail.client';
import {Evenementdetail} from './evenementdetail';
import 'rxjs/add/operator/finally';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-evenement',
  templateUrl: 'evenement.html',
})
export class EvenementPage {

  evenement: Evenementdetail = <Evenementdetail>{};
  datumweergave: string[];
  reactie: string;
  aanHetAanmelden = false;
  aanHetVersturen = false;
  spinning = true;

  constructor(
    private evenementdetailClient: EvenementdetailClient,
    private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.evenementdetailClient.haalEvenementOp(this.navParams.get('url'))
    // TODO: spinning ook op false zetten bij fout
      .do(() => this.spinning = false)
      .subscribe(evenement => this.toonEvenement(evenement));
  }

  toggleDeelname() {
    if (this.evenement) {
      this.aanHetAanmelden = true;
      this.evenementdetailClient.schrijfIn(this.navParams.get('url'), !this.evenement.deelname)
        .subscribe(evenement => {
          this.aanHetAanmelden = false;
          this.toonEvenement(evenement)
        });
    }
  }

  verstuurBericht() {
    this.aanHetVersturen = true;
    this.evenementdetailClient.verstuurBericht(this.navParams.get('url'), this.reactie)
      .finally(() => this.aanHetVersturen = null)
      .subscribe(evenement => {
        this.toonEvenement(evenement);
        this.reactie = '';
      });
  }

  private toonEvenement(evenement: Evenementdetail) {
    this.evenement = evenement;
    this.datumweergave = formatteerDatumtijd(evenement.start, evenement.einde);
  }
}

function formatteerDatumtijd(start: string, einde: string): string[] {
  const startdatum = moment(start).format('dd D MMM YYYY');
  const starttijd = moment(start).format('H:mm');
  const einddatum = moment(einde).format('dd D MMM YYYY');
  const eindtijd = moment(einde).format('H:mm');
  if (startdatum === einddatum) {
    return [`${startdatum}, ${starttijd} - ${eindtijd}`];
  } else {
    return [
      `${startdatum}, ${starttijd}`,
      `${einddatum}, ${eindtijd}`];
  }
}
