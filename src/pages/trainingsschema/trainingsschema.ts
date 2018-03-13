import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Trainingsschema} from './trainingsschema.domain';
import {InstellingenService} from '../../core/instellingen/instellingen.service';
import {Training} from './training';
import * as moment from 'moment';
import {TrainingsschemaService} from './trainingsschema.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil, tap} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-trainingsschema',
  templateUrl: 'trainingsschema.html',
})
export class TrainingsschemaPage {

  destroy = new Subject<boolean>();
  trainingsschema: Trainingsschema;
  groep: String;
  spinning = true;

  constructor(private trainingsschemaService: TrainingsschemaService,
              private instellingenService: InstellingenService,
              private navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.trainingsschemaService.haalTrainingsschemaOp().pipe(
      takeUntil(this.destroy),
      // TODO: spinning ook op false zetten bij fout
      tap(() => this.spinning = false)
    ).subscribe((trainingsschema : Trainingsschema) => this.trainingsschema = trainingsschema);
    this.instellingenService.getInstellingen()
      .takeUntil(this.destroy)
      .subscribe(instellingen => {
        this.groep = (instellingen && instellingen.groep) || 'A';
      });
  }

  ionViewWillLeave() {
    this.destroy.next(true);
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
