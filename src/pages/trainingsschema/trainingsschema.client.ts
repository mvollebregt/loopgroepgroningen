import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login.service";
import {Trainingsschema} from './trainingsschema.domain';
import {Sectie} from '../../core/sectie';
import {Training} from './training';


@Injectable()
export class TrainingsschemaClient {

  constructor(private loginService: LoginService) {
  }

  haalTrainingsschemaOp(): Observable<Trainingsschema> {
    // alleen tonen als ingelogd
    return this.loginService
      .login()
      .switchMap(() => Observable.of({A: A, B: B, C: C}));
  }
}

const A: Sectie<Training>[] = [
    { 'titel': 'Week 4', 'inhoud': [
    { 'datum': '2018-01-24', 'omschrijving': 'duurloop 50 min 75%', 'locatie': 'Noorddijk'},
    { 'datum': '2018-01-27', 'omschrijving': 'duurloop 55 min 75%', 'locatie': 'Aduarderbrug'},
    { 'titel': 'eigen 3e training', 'datum': '2018-01-29', 'omschrijving': 'duurloop 30 min, 75%'}]},

    { 'titel': 'Week 5', 'inhoud': [
    { 'datum': '2018-01-31', 'omschrijving': '3 x 8 min 85%, 2 min 70% rust', 'locatie': 'Zilvermeer'},
    { 'datum': '2018-02-03', 'omschrijving': 'duurloop 50 min 75% (incl 2 x 6 min 85%, 2 min 70% rust)', 'locatie': 'Kardinge'},
    { 'titel': 'eigen 3e training', 'datum': '2018-02-05', 'omschrijving': 'duurloop 50 min, 75%'}]},

    { 'titel': 'Week 6', 'inhoud': [
    { 'datum': '2018-02-07', 'omschrijving': 'pyramydeloop 1-1-2-2-3-3-2-2-1-1, 20 min uitloop', 'locatie': 'Voetbalveld'},
    { 'datum': '2018-02-10', 'omschrijving': 'duurloop 50 min 75% (incl 20 min 85%)', 'locatie': 'Richting Bedum'},
    { 'titel': 'eigen 3e training', 'datum': '2018-02-12', 'omschrijving': 'duurloop 40 min, 80%'}]}
];

const B: Sectie<Training>[] = [
    { 'titel': 'Week 4', 'inhoud': [
    { 'datum': '2018-01-24', 'omschrijving': 'duurloop 60 min 75%', 'locatie': 'Noorddijk'},
    { 'datum': '2018-01-27', 'omschrijving': 'duurloop 65 min 75%', 'locatie': 'Aduarderbrug'},
    { 'titel': 'eigen 3e training', 'datum': '2018-01-29', 'omschrijving': 'duurloop 40 min, 75%'}]},

    { 'titel': 'Week 5', 'inhoud': [
    { 'datum': '2018-01-31', 'omschrijving': '4 x 8 min 85%, 2 min 70% rust', 'locatie': 'Zilvermeer'},
    { 'datum': '2018-02-03', 'omschrijving': 'duurloop 60 min 75% (incl 3 x 6 min 85%, 2 min 70% rust)', 'locatie': 'Kardinge'},
    { 'titel': 'eigen 3e training', 'datum': '2018-02-05', 'omschrijving': 'duurloop 60 min, 75%'}]},

    { 'titel': 'Week 6', 'inhoud': [
    { 'datum': '2018-02-07', 'omschrijving': 'pyramydeloop 1-1-2-2-3-3-2-2-1-1, (2x met 5 min rust) 10 min uitloop', 'locatie': 'Voetbalveld'},
    { 'datum': '2018-02-10', 'omschrijving': 'duurloop 60 min 75% (incl 25 min 85%)', 'locatie': 'Richting Bedum'},
    { 'titel': 'eigen 3e training', 'datum': '2018-02-12', 'omschrijving': 'duurloop 50 min, 80%'}]}
];

const C: Sectie<Training>[] = [
    { 'titel': 'Week 4', 'inhoud': [
    { 'datum': '2018-01-24', 'omschrijving': 'duurloop 75 min 75%', 'locatie': 'Noorddijk'},
    { 'datum': '2018-01-27', 'omschrijving': 'duurloop 80 min 75%', 'locatie': 'Aduarderbrug'},
    {'titel': 'eigen 3e training', 'datum': '2018-01-29', 'omschrijving': 'duurloop 50 min, 75%'}]},

    { 'titel': 'Week 5', 'inhoud': [
    { 'datum': '2018-01-31', 'omschrijving': '5 x 8 min 85%, 2 min 70% rust', 'locatie': 'Zilvermeer'},
    { 'datum': '2018-02-03', 'omschrijving': 'duurloop 75 min 75% (incl 4 x 6 min 85%, 2 min 70% rust)', 'locatie': 'Kardinge'},
    {'titel': 'eigen 3e training', 'datum': '2018-02-05', 'omschrijving': 'duurloop 70 min, 75%'}]},

    { 'titel': 'Week 6', 'inhoud': [
    { 'datum': '2018-02-07', 'omschrijving': 'pyramydeloop 1-1-2-2-3-3-2-2-1-1, (3x met 5 min rust)', 'locatie': 'Voetbalveld'},
    { 'datum': '2018-02-10', 'omschrijving': 'duurloop 70 min 75% (incl 30 min 85%)', 'locatie': 'Richting Bedum'},
    {'titel': 'eigen 3e training', 'datum': '2018-02-12', 'omschrijving': 'duurloop 60 min, 80%'}]}
];
