import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AgendaClient} from './agenda.client';
import {Evenement} from './evenement';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';
import {InstellingenService} from '../../core/instellingen/instellingen.service';
import {finalize, map} from 'rxjs/operators';
import {Instellingen} from '../../core/instellingen/instellingen';

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  evenementen: Sectie<Evenement>[];
  ingelogd: Observable<boolean>;
  spinning = true;

  constructor(
    private agendaClient: AgendaClient,
    private instellingenService: InstellingenService,
    private navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.ingelogd = this.instellingenService.getInstellingen().pipe(
      map((instellingen: Instellingen) => instellingen.ingelogd)
    );
    this.agendaClient.haalEvenementenOp().pipe(
      map(sectioneer<Evenement>(evenement => moment(evenement.start).format('MMMM'))),
      finalize(() => this.spinning = false)
    ).subscribe(resultaat => this.evenementen = resultaat);
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  gaNaarEvenement(evenement: Evenement) {
    this.navCtrl.push('EvenementPage',{url: evenement.url});
  }

}
