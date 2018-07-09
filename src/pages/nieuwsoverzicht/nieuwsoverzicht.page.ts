import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Nieuwsbericht} from './models/nieuwsbericht';
import {Store} from '@ngrx/store';
import {LoadNieuwsberichten} from './store/nieuwsberichten.action';
import {
  getNieuwsberichten,
  getNieuwsberichtenError,
  getNieuwsberichtenLoading,
  NieuwsState
} from './store/nieuws.reducers';

@IonicPage()
@Component({
  selector: 'page-nieuws',
  templateUrl: './nieuwsoverzicht.page.html'
})
export class NieuwsoverzichtPage implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  spinning: Observable<boolean>;
  error: Observable<boolean>;

  constructor(private store: Store<NieuwsState>) {}

  ngOnInit() {
    this.nieuwsberichten = this.store.select(getNieuwsberichten);
    this.spinning = this.store.select(getNieuwsberichtenLoading);
    this.error = this.store.select(getNieuwsberichtenError);
    this.store.dispatch(new LoadNieuwsberichten());
  }
}
