import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {Training, Trainingsschema} from '../../api';
import {TrainingsschemaClient} from '../services/trainingsschema.client';

@Component({
  selector: 'lg-trainingsschema-page',
  templateUrl: 'trainingsschema-page.component.html',
  styleUrls: ['trainingsschema-page.component.scss']
})
export class TrainingsschemaPageComponent implements OnInit, OnDestroy {

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

  getId(training: Training) {
    return training.datum;
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  kop(training: Training) {
    return training.titel || moment(training.datum).format('dddd D MMM');
  }

  kiesGroep(keuze: string) {
    // this.instellingenService.setInstellingen({groep: keuze});
  }
}
