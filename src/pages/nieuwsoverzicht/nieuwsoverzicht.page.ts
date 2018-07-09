import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Nieuwsbericht} from './models/nieuwsbericht';
import {Store} from '@ngrx/store';
import {LoadNieuwsberichten} from './store/nieuwsberichten.action';
import {getNieuwsberichten, getNieuwsberichtenLoading, NieuwsState} from './store/nieuws.reducers';
import {of} from 'rxjs/observable/of';

@IonicPage()
@Component({
  selector: 'page-nieuws',
  templateUrl: './nieuwsoverzicht.page.html'
})
export class NieuwsoverzichtPage implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  spinning: Observable<boolean> = of(true);

  constructor(private store: Store<NieuwsState>) {}

  ngOnInit() {
    this.nieuwsberichten = this.store.select(getNieuwsberichten);
    this.spinning = this.store.select(getNieuwsberichtenLoading);
    this.store.dispatch(new LoadNieuwsberichten());
  }
}
