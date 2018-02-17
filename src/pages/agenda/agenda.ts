import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AgendaClient} from './agenda.client';
import {Evenement} from './evenement';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';
import {InstellingenService} from '../../core/instellingen/instellingen.service';

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  evenementen: Observable<Sectie<Evenement>[]>;
  ingelogd: Observable<boolean>;
  spinning = true;

  constructor(
    private agendaClient: AgendaClient,
    private instellingenService: InstellingenService,
    private navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.ingelogd = this.instellingenService.getInstellingen().map(instellingen => instellingen.ingelogd);
    this.evenementen = this.agendaClient.haalEvenementenOp()
      .map(sectioneer<Evenement>(evenement => moment(evenement.start).format('MMMM')))
      .do(() => this.spinning = false);
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  gaNaarEvenement(evenement: Evenement) {
    this.navCtrl.push('EvenementPage',{url: evenement.url});
  }

}
