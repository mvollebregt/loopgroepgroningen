import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EvenementPage} from "../evenement/evenement";
import {AgendaClient} from './agenda.client';
import {Evenement} from '../../core/evenement';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';

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

  constructor(private agendaClient: AgendaClient, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.evenementen = this.agendaClient.haalEvenementenOp()
      .map(sectioneer<Evenement>(evenement => moment(evenement.start).format('MMMM')));
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  gaNaarEvenement() {
    this.navCtrl.push('EvenementPage');
  }

}
