import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Nieuwsbericht} from '../../features/nieuws/shared/nieuwsbericht';
import {getNieuwsberichten, NieuwsState} from '../../features/nieuws/store/nieuws.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'lg-nieuwsbericht',
  templateUrl: './nieuwsbericht.page.html',
})
export class NieuwsberichtPage implements OnInit {

  nieuwsbericht: Observable<Nieuwsbericht>;

  constructor(
    private store: Store<NieuwsState>,
    private navParams: NavParams) {}

  ngOnInit() {
    const volgnummer = this.navParams.get('volgnummer');
    this.nieuwsbericht = this.store.select(getNieuwsberichten).pipe(
      map(nieuwsberichten => nieuwsberichten.find(
        nieuwsbericht => nieuwsbericht.volgnummer === volgnummer))
    )
  }

}
