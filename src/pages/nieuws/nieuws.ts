import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Nieuwsbericht} from './nieuwsbericht';
import {Store} from '@ngrx/store';
import {LoadNieuwsberichten} from './store/nieuwsberichten.action';
import {getNieuwsberichten, NieuwsState} from './store/nieuws.reducers';

@IonicPage()
@Component({
  selector: 'page-nieuws',
  templateUrl: 'nieuws.html'
})
export class NieuwsPage implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;

  constructor(private store: Store<NieuwsState>) {}

  ngOnInit() {
    this.nieuwsberichten = this.store.select(getNieuwsberichten);
    this.store.dispatch(new LoadNieuwsberichten());
  }
}
