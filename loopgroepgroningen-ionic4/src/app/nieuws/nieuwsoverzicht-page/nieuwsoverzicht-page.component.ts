import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {getNieuwsberichten, NieuwsState} from '../store/nieuws.reducers';
import {LoadNieuwsberichten} from '../store/nieuwsberichten.action';

@Component({
  selector: 'lg-nieuwsoverzicht-page',
  templateUrl: './nieuwsoverzicht-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPageComponent implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  spinning: Observable<boolean>;
  error: Observable<boolean>;

  constructor(
    private store: Store<NieuwsState>,
    /*private navCtrl: NavController*/) {
  }

  ngOnInit() {
    this.nieuwsberichten = this.store.pipe(select(getNieuwsberichten));
    // this.spinning = combineLatest(
    //   this.nieuwsberichten,
    //   this.store.pipe(select(getNieuwsberichtenLoading))
    // ).pipe(
    //   map(([berichten, loading]) => !berichten.length && loading)
    // );
    // this.error = this.store.pipe(select(getNieuwsberichtenError));
    this.store.dispatch(new LoadNieuwsberichten());
  }

  onPull(t: string) {
    console.log(t);
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    // this.navCtrl.push('NieuwsberichtPage', {volgnummer: nieuwsbericht.volgnummer});
  }
}
