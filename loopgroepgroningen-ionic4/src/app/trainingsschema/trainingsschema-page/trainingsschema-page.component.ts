import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Training, Trainingsschema} from '../../api';
import {select, Store} from '@ngrx/store';
import {getTrainingsschema} from '../store/trainingsschema.state';
import {LaadTrainingsschema} from '../store/trainingsschema.action';

@Component({
  selector: 'lg-trainingsschema-page',
  templateUrl: 'trainingsschema-page.component.html'
})
export class TrainingsschemaPageComponent implements OnInit, OnDestroy {

  destroy = new Subject<boolean>();
  trainingsschema: Trainingsschema;
  groep: string;
  spinning = true;

  constructor(private trainingsschemaStore: Store<Trainingsschema>) {
  }

  ngOnInit() {
    this.trainingsschemaStore.pipe(
      select(getTrainingsschema),
      takeUntil(this.destroy)
    ).subscribe(trainingsschema => {
      this.trainingsschema = trainingsschema;
    });
    this.trainingsschemaStore.dispatch(new LaadTrainingsschema());
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
