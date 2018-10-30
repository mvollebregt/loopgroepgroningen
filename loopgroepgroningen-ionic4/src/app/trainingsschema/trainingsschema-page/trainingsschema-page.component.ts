import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {Training, Trainingsschema} from '../../api';
import {TrainingsschemaClient} from '../services/trainingsschema.client';

@Component({
  selector: 'lg-trainingsschema-page',
  templateUrl: 'trainingsschema-page.component.html',
})
export class TrainingsschemaPageComponent implements OnInit {

  destroy = new Subject<boolean>();
  trainingsschema: Trainingsschema;
  groep: String;
  spinning = true;

  constructor(private trainingsschemaClient: TrainingsschemaClient) {
  }

  ngOnInit() {
    this.trainingsschemaClient.haalTrainingsschemaOp().pipe(
      takeUntil(this.destroy),
      finalize(() => this.spinning = false)
    ).subscribe(trainingsschema => this.trainingsschema = trainingsschema);

    this.groep = 'C'; // TODO: uit store lezen
  }

  ionViewWillLeave() {
    this.destroy.next(true);
  }

  kop(training: Training) {
    return training.titel || moment(training.datum).format('dddd D MMM');
  }

  kiesGroep(keuze: string) {
    // this.instellingenService.setInstellingen({groep: keuze});
  }
}
