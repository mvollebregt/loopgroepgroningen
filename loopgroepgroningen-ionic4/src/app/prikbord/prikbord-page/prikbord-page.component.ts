import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Bericht} from '../../api';
import {select, Store} from '@ngrx/store';
import {getPrikbordBerichten, PrikbordState} from '../store/prikbord.state';
import {CheckNieuwePrikbordBerichten} from '../store/prikbord.action';

@Component({
    selector: 'lg-prikbord-page',
    templateUrl: './prikbord-page.component.html'
})
export class PrikbordPageComponent implements OnInit {

  berichten: Observable<Bericht[]>;

  // @ViewChild(Content) private content: Content;

  constructor(
    // private instellingenService: InstellingenService,
    private prikbordStore: Store<PrikbordState>) {
  }

  ngOnInit() {
    this.berichten = this.prikbordStore.pipe(select(getPrikbordBerichten));
    this.prikbordStore.dispatch(new CheckNieuwePrikbordBerichten());
  }

  // verstuurBericht() {
  //   this.aanHetVersturen = true;
  //   this.prikbordService.verstuurBericht(this.reactie).pipe(
  //     finalize(() => this.aanHetVersturen = null)
  //   ).subscribe(() => {
  //     this.reactie = '';
  //   });
  // }
}
