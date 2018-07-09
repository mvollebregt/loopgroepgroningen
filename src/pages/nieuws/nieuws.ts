import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Nieuwsbericht} from './nieuwsbericht';
import {of} from 'rxjs/observable/of';

/**
 * Generated class for the NieuwsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nieuws',
  templateUrl: 'nieuws.html'
})
export class NieuwsPage {

  nieuwsberichten: Observable<Nieuwsbericht[]> = of([{
    titel: 'Hallo, ik ben Bianca',
    datum: '2018-07-08',
    plaatje: 'http://www.loopgroepgroningen.nl/images/Bianca1.jpg',
    samenvatting: 'Hallo loopmaatjes, Ik ben Bianca en zit sinds een paar weekjes'
  }, {
    titel: 'Arlette blijft lekker doorwandelen ....',
    datum: '2018-07-08',
    plaatje: 'http://www.loopgroepgroningen.nl/images/Arlette18.jpg',
    samenvatting: 'Hallo allemaal, Even weer een berichtje... Na mijn'
  }]);


}
