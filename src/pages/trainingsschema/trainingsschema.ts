import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TrainingsschemaClient} from './trainingsschema.client';
import {Trainingsschema} from './trainingsschema.domain';
import {Observable} from 'rxjs/Observable';

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
export class TrainingsschemaPage implements OnInit {

  trainingsschema: Observable<Trainingsschema>;

  constructor(private trainingsschemaClient: TrainingsschemaClient, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.trainingsschema = this.trainingsschemaClient.haalTrainingsschemaOp();
  }

  gaNaarEvenement() {
    this.navCtrl.push('EvenementPage');
  }
}
