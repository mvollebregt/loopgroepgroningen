import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Training, Trainingsschema} from '../../api';
import {select, Store} from '@ngrx/store';
import {getTrainingsschema} from '../store/trainingsschema.state';
import {LaadTrainingsschema} from '../store/trainingsschema.action';
import {CoreState} from '../../core/store/core.state';
import {ZetInstellingenGroep} from '../../core/store/instellingen/instellingen.action';
import {getGroep} from '../../core/store/instellingen/instellingen.state';

@Component({
  selector: 'lg-trainingsschema-page',
  templateUrl: 'trainingsschema-page.component.html'
})
export class TrainingsschemaPageComponent implements OnInit {

  trainingsschema: Observable<Trainingsschema>;
  groep: Observable<string>;

  // spinning = true;

  constructor(
    private coreStore: Store<CoreState>,
    private trainingsschemaStore: Store<Trainingsschema>) {
  }

  ngOnInit() {
    this.groep = this.coreStore.pipe(select(getGroep));
    this.trainingsschema = this.trainingsschemaStore.pipe(select(getTrainingsschema));
    this.trainingsschemaStore.dispatch(new LaadTrainingsschema());
  }

  getId(training: Training) {
    return training.datum;
  }

  kop(training: Training) {
    return training.titel || moment(training.datum).format('dddd D MMM');
  }

  kiesGroep(keuze: 'A' | 'B' | 'C') {
    // Zonder de timeout van 50ms update android eerst het trainingsschema en volgt daarna pas de klik-animatie
    setTimeout(() => this.coreStore.dispatch(new ZetInstellingenGroep(keuze)), 50);
  }
}
