import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {first, map, takeWhile} from 'rxjs/operators';
import {InfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {LaadOudereNieuwsBerichten} from '../store/nieuws.action';
import {AanroepStatus} from '../../shared/backend/aanroep-status';
import {getMeerNieuwsBeschikbaar, getNieuwsberichten, getNieuwsLaadStatus, NieuwsState} from '../store/nieuws.state';

@Component({
  selector: 'lg-nieuwsoverzicht-page',
  templateUrl: './nieuwsoverzicht-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPageComponent implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  meerBeschikbaar: Observable<boolean>;
  spinning: Observable<boolean>;
  fout: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<NieuwsState>) {
  }

  ngOnInit() {
    this.nieuwsberichten = this.store.pipe(select(getNieuwsberichten));
    this.meerBeschikbaar = this.store.pipe(select(getMeerNieuwsBeschikbaar));
    this.fout = this.store.pipe(
      select(getNieuwsLaadStatus),
      map(status => !!status.fouten && status.fouten.length > 0));
    this.laadInitieleInhoud();
  }

  private laadInitieleInhoud() {
    combineLatest(this.nieuwsberichten, this.meerBeschikbaar).pipe(
      takeWhile(([nieuwsberichten, meerBeschikbaar]) => !nieuwsberichten || (nieuwsberichten.length < 15 && meerBeschikbaar))
    ).subscribe(() =>
      setTimeout(() => this.laadOudereNieuwsberichten())
    );
  }

  laadOudereNieuwsberichten(infiniteScroll?: InfiniteScroll) {
    this.store.dispatch(new LaadOudereNieuwsBerichten());
    if (infiniteScroll) {
      this.store.pipe(
        select(getNieuwsLaadStatus),
        first(laadstatus => laadstatus !== AanroepStatus.bezig),
      ).subscribe(() => infiniteScroll.complete());
    }
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    this.router.navigate(['nieuws', nieuwsbericht.id]);
  }
}
