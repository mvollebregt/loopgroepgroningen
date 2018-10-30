import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {getLoadingMore, getNieuwsberichten, getReachedEndOfList, NieuwsState} from '../store/nieuws.reducers';
import {LoadMoreNieuwsberichten} from '../store/nieuwsberichten.action';
import {filter} from 'rxjs/operators';
import {InfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';

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
    private router: Router,
    private store: Store<NieuwsState>,
    /*private navCtrl: NavController*/) {
  }

  ngOnInit() {
    this.nieuwsberichten = this.store.pipe(
      select(getNieuwsberichten)
    );
    this.reachedEndOfList = this.store.pipe(
      select(getReachedEndOfList)
    );
    this.loadInitialItems();
  }

  private loadInitialItems() {
    combineLatest(
      this.store.pipe(select(getNieuwsberichten)),
      this.store.pipe(select(getReachedEndOfList))
    ).pipe(
      filter(([nieuwsberichten, reachedEndOfList]) => nieuwsberichten.length < 15 && !reachedEndOfList)
    ).subscribe(() =>
      setTimeout(() => this.loadMore())
    )
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
    this.router.navigate(['nieuws', nieuwsbericht.id]);
  }
}
