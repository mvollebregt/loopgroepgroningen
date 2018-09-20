import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {getLoadingMore, getNieuwsberichten, getReachedEndOfList, NieuwsState} from '../store/nieuws.reducers';
import {LoadMoreNieuwsberichten} from '../store/nieuwsberichten.action';
import {filter, tap} from 'rxjs/operators';
import {InfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'lg-nieuwsoverzicht-page',
  templateUrl: './nieuwsoverzicht-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPageComponent implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  spinning: Observable<boolean>;
  error: Observable<boolean>;
  reachedEndOfList: Observable<boolean>;

  constructor(
    private store: Store<NieuwsState>,
    /*private navCtrl: NavController*/) {
  }

  ngOnInit() {
    this.nieuwsberichten = this.store.pipe(
      select(getNieuwsberichten),
      tap(nieuwsberichten => {
        if (nieuwsberichten.length < 15) { // TODO: check reachedEndOfList
          this.loadMore();
        }
      })
    );
    this.reachedEndOfList = this.store.pipe(
      select(getReachedEndOfList)
    );
  }

  onPull(t: string) {
    this.loadMore();
  }

  loadMore(infiniteScroll?: InfiniteScroll) {
    this.store.dispatch(new LoadMoreNieuwsberichten());
    if (infiniteScroll) {
      // TODO: dit naar OnInit en unsubscriben?
      this.store.pipe(
        select(getLoadingMore),
        filter(loadingMore => !loadingMore),
      ).subscribe(() => infiniteScroll.complete());
    }
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    // this.navCtrl.push('NieuwsberichtPage', {volgnummer: nieuwsbericht.volgnummer});
  }
}
