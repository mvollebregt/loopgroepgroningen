import {Injectable} from '@angular/core';
import {TrainingsschemaClient} from './trainingsschema.client';
import {Observable} from 'rxjs/Observable';
import {Trainingsschema} from './trainingsschema.domain';
import {Sectie} from '../../core/sectie';
import {Training} from './training';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

@Injectable()
export class TrainingsschemaService {

  constructor(private trainingsschemaClient: TrainingsschemaClient) {}

  haalTrainingsschemaOp(): Observable<Trainingsschema> {
    return this.trainingsschemaClient.haalTrainingsschemaOp().pipe(
      map((trainingsschema: Trainingsschema) => ({
        A: filterToekomst(trainingsschema.A),
        B: filterToekomst(trainingsschema.B),
        C: filterToekomst(trainingsschema.C)
      })
    ))
  }

}

function filterToekomst(secties: Sectie<Training>[]) : Sectie<Training>[] {
  let gefilterd: Sectie<Training>[] = [];
  for (let sectie of secties) {
    let trainingen: Training[] = [];
    for (let training of sectie.inhoud) {
      if (moment().startOf('day').isSameOrBefore(training.datum)) {
        trainingen.push(training);
      }
    }
    if (trainingen.length) {
      gefilterd.push({titel: sectie.titel, inhoud: trainingen})
    }
  }
  return gefilterd;
}

