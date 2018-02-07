import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EvenementdetailClient} from './evenementdetail.client';
import {Evenementdetail} from './evenementdetail';
import 'rxjs/add/operator/finally';
import * as moment from 'moment';

/**
 * Generated class for the EvenementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evenement',
  templateUrl: 'evenement.html',
})
export class EvenementPage implements OnInit {

  evenement: Evenementdetail = <Evenementdetail>{};
  datumweergave: string[];
  reactie: string;
  aanHetVersturen = false;

  constructor(private evenementdetailClient: EvenementdetailClient, private navCtrl: NavController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.evenementdetailClient.haalEvenementOp(this.navParams.get('url'))
      .subscribe(evenement => this.toonEvenement(evenement));
  }

  toggleDeelname() {
    this.evenementdetailClient.schrijfIn(this.navParams.get('url'), !this.evenement.deelname)
      .subscribe(evenement => this.toonEvenement(evenement));
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
