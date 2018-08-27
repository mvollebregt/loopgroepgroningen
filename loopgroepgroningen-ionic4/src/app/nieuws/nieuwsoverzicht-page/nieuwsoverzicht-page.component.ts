import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {NieuwsState} from '../store/nieuws.reducers';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'lg-nieuwsoverzicht-page',
  templateUrl: './nieuwsoverzicht-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPageComponent implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]> = of([{
    volgnummer: 1,
    titel: 'nieuwbericht',
    datum: '2018-07-13',
    content: [],
    thumbnail: '',
    samenvatting: 'de samenvatting'
  }]);
  spinning: Observable<boolean>;
  error: Observable<boolean>;

  constructor(
    private store: Store<NieuwsState>,
    /*private navCtrl: NavController*/) {
  }

  ngOnInit() {
    // this.nieuwsberichten = this.store.pipe(select(getNieuwsberichten));
    // this.spinning = combineLatest(
    //   this.nieuwsberichten,
    //   this.store.pipe(select(getNieuwsberichtenLoading))
    // ).pipe(
    //   map(([berichten, loading]) => !berichten.length && loading)
    // );
    // this.error = this.store.pipe(select(getNieuwsberichtenError));
    // this.store.dispatch(new LoadNieuwsberichten());
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    // this.navCtrl.push('NieuwsberichtPage', {volgnummer: nieuwsbericht.volgnummer});
  }
}
