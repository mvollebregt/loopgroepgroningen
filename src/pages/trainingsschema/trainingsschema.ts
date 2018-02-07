import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TrainingsschemaClient} from './trainingsschema.client';
import {Trainingsschema} from './trainingsschema.domain';
import {InstellingenService} from '../../core/instellingen.service';
import 'rxjs/add/operator/pluck';
import {Subscription} from 'rxjs/Subscription';

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

  private subscriptions: Subscription[] = [];

  constructor(private trainingsschemaClient: TrainingsschemaClient,
              private instellingenService: InstellingenService,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingsschemaClient.haalTrainingsschemaOp().subscribe(trainingsschema =>
        this.trainingsschema = trainingsschema));
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

  kiesGroep(keuze: string) {
    this.instellingenService.setInstellingen({groep: keuze});
  }

  gaNaarEvenement() {
    this.navCtrl.push('EvenementPage');
  }
}
