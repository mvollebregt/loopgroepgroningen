import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {LOAD_NIEUWSBERICHTEN, LoadNieuwsberichtenFail, LoadNieuwsberichtenSuccess} from './nieuwsberichten.action';
import {Nieuwsbericht} from '../shared/nieuwsbericht';
import {NieuwsClient} from '../shared/nieuws.client';


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
    private nieuwsClient: NieuwsClient
  ) {
  }

  @Effect()
  loadNieuwsberichten = this.actions
    .ofType(LOAD_NIEUWSBERICHTEN)
    .pipe(
      exhaustMap(() =>
        this.nieuwsClient.haalNieuwsberichtenOp().pipe(
          map(nieuwsberichten => new LoadNieuwsberichtenSuccess(nieuwsberichten)),
          catchError(error => {
            console.log(error);
            return of(new LoadNieuwsberichtenFail(error));
          })
        )
      ));

}
