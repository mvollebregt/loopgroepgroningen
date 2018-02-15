import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Trainingsschema} from './trainingsschema.domain';
import {InstellingenService} from '../../core/instellingen/instellingen.service';
import 'rxjs/add/operator/pluck';
import {Subscription} from 'rxjs/Subscription';
import {Training} from './training';
import * as moment from 'moment';
import {TrainingsschemaService} from './trainingsschema.service';

/**
 * Generated class for the TrainingsschemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trainingsschema',
  templateUrl: 'trainingsschema.html',
})
export class TrainingsschemaPage implements OnInit, OnDestroy {

  trainingsschema: Trainingsschema;
  groep: String;
  spinning = true;

  private subscriptions: Subscription[] = [];

  constructor(private trainingsschemaService: TrainingsschemaService,
              private instellingenService: InstellingenService,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingsschemaService.haalTrainingsschemaOp()
        .do(() => this.spinning = false)
        .subscribe(trainingsschema => this.trainingsschema = trainingsschema));
    this.subscriptions.push(
      this.instellingenService.getInstellingen().subscribe(instellingen => {
          this.groep = (instellingen && instellingen.groep) || 'A';
        }));
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  kop(training: Training) {
    return training.titel || moment(training.datum).format('dddd D MMM');
  }

  kiesGroep(keuze: string) {
    this.instellingenService.setInstellingen({groep: keuze});
  }

  gaNaarEvenement() {
    this.navCtrl.push('EvenementPage');
  }
}
