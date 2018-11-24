import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {exhaustMap, first, map, takeWhile} from 'rxjs/operators';
import {InfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {LaadOudereNieuwsBerichten} from '../store/nieuws.action';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {getMeerNieuwsBeschikbaar, getNieuwsberichten, getNieuwsLaadStatus, NieuwsState} from '../store/nieuws.state';
import {Aanroepfase} from '../../core/backend/models/aanroepfase';

@Component({
  selector: 'lg-nieuwsoverzicht-page',
  templateUrl: './nieuwsoverzicht-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NieuwsoverzichtPageComponent implements OnInit {

  nieuwsberichten: Observable<Nieuwsbericht[]>;
  meerBeschikbaar: Observable<boolean>;
  bezig: Observable<boolean>;
  fout: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<NieuwsState>) {
  }

  ngOnInit() {
    this.nieuwsberichten = this.store.pipe(select(getNieuwsberichten));
    this.meerBeschikbaar = this.store.pipe(select(getMeerNieuwsBeschikbaar));
    const laadstatus = this.store.pipe(select(getNieuwsLaadStatus));
    this.bezig = laadstatus.pipe(map(status => status.fase === Aanroepfase.bezig));
    this.fout = laadstatus.pipe(map(status => !!status.fout));
    this.laadInitieleInhoud();
  }

  private laadInitieleInhoud() {
    this.bezig.pipe(
      first(bezig => !bezig),
      exhaustMap(() => combineLatest(this.nieuwsberichten, this.meerBeschikbaar)),
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
        first(laadstatus => laadstatus !== Aanroepstatus.bezig),
      ).subscribe(() => infiniteScroll.complete());
    }
  }

  gaNaarNieuwsbericht(nieuwsbericht: Nieuwsbericht) {
    this.router.navigate(['nieuws', nieuwsbericht.id]);
  }
}
