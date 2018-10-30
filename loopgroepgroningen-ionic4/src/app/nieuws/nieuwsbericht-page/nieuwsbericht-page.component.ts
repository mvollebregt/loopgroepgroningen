import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Nieuwsbericht} from '../../api';
import {getNieuwsberichten, NieuwsState} from '../store/nieuws.reducers';

@Component({
  selector: 'lg-nieuwsbericht',
  templateUrl: './nieuwsbericht-page.component.html',
})
export class NieuwsberichtPageComponent implements OnInit {

  nieuwsbericht: Observable<Nieuwsbericht>;

  constructor(
    private store: Store<NieuwsState>,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.nieuwsbericht = this.store.pipe(
      select(getNieuwsberichten),
      map(nieuwsberichten => nieuwsberichten.find(
        nieuwsbericht => nieuwsbericht.id === id))
    );
  }

}
