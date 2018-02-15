import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {EvenementPage} from "../evenement/evenement";
import {AgendaClient} from './agenda.client';
import {Evenement} from './evenement';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';
import {InstellingenService} from '../../core/instellingen/instellingen.service';

/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {

  evenementen: Observable<Sectie<Evenement>[]>;
  ingelogd: Observable<boolean>;
  spinning = true;

  constructor(
    private agendaClient: AgendaClient,
    private instellingenService: InstellingenService,
    private navCtrl: NavController) {
  }

  ngOnInit() {
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
