import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../features/nieuws/shared/nieuwsbericht';
import {LoadNieuwsberichten} from '../../features/nieuws/store/nieuwsberichten.action';
import {
  getNieuwsberichten,
  getNieuwsberichtenError,
  getNieuwsberichtenLoading,
  NieuwsState
} from '../../features/nieuws/store/nieuws.reducers';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-nieuws',
  templateUrl: './nieuwsoverzicht.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPage implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  spinning: Observable<boolean>;
  error: Observable<boolean>;

  constructor(
    private store: Store<NieuwsState>,
    private navCtrl: NavController) {}

  ngOnInit() {
    this.nieuwsberichten = this.store.select(getNieuwsberichten);
    this.spinning = combineLatest(
      this.nieuwsberichten,
      this.store.select(getNieuwsberichtenLoading)
    ).pipe(
      map(([berichten, loading]) => !berichten.length && loading)
    );
    this.error = this.store.select(getNieuwsberichtenError);
    this.store.dispatch(new LoadNieuwsberichten());
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    this.navCtrl.push('NieuwsberichtPage', {volgnummer: nieuwsbericht.volgnummer});
  }
}
