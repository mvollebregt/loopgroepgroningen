import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {exhaustMap} from 'rxjs/operators';
import {LOAD_NIEUWSBERICHTEN, LoadNieuwsberichtenSuccess} from './nieuwsberichten.action';
import {Nieuwsbericht} from '../nieuwsbericht';


const testdata: Nieuwsbericht[] = [{
  titel: 'Hallo, ik ben Bianca',
  datum: '2018-07-08',
  plaatje: 'http://www.loopgroepgroningen.nl/images/Bianca1.jpg',
  samenvatting: 'Hallo loopmaatjes, Ik ben Bianca en zit sinds een paar weekjes'
}, {
  titel: 'Arlette blijft lekker doorwandelen ....',
  datum: '2018-07-08',
  plaatje: 'http://www.loopgroepgroningen.nl/images/Arlette18.jpg',
  samenvatting: 'Hallo allemaal, Even weer een berichtje... Na mijn'
}];


@Injectable()
export class NieuwsberichtenEffects {
  constructor(
    private actions: Actions,
  ) {}

  @Effect()
  loadNieuwsberichten = this.actions
    .ofType(LOAD_NIEUWSBERICHTEN)
    .pipe(
      exhaustMap(() => of(new LoadNieuwsberichtenSuccess(testdata)))
    );
}
