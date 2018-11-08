import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Evenement} from '../../api';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AgendaState, getAgendaEvenementen} from '../store/agenda.state';
import {takeUntil, tap} from 'rxjs/operators';
import {LaadAgendaEvenementdetails, LaadAgendaEvenementen} from '../store/agenda.action';

@Component({
  selector: 'lg-agenda-page',
  templateUrl: 'agenda-page.component.html',
  styleUrls: ['agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit, OnDestroy {

  evenementen: Observable<Evenement[]>;

  private destroyed = new Subject<void>();

  // spinning = true;

  constructor(private router: Router, private agendaStore: Store<AgendaState>) {
  }

  ngOnInit() {
    this.evenementen = this.agendaStore.pipe(
      select(getAgendaEvenementen),
      tap(console.log),
      takeUntil(this.destroyed)
    );
    this.agendaStore.dispatch(new LaadAgendaEvenementen());
  }

  ngOnDestroy() {
    console.log('destroy');
    this.destroyed.next();
    this.destroyed.complete();
  }

  titel(evenement: Evenement) {
    return moment(evenement.start).format('MMMM');
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  onItemClicked(evenement: Evenement) {
    this.agendaStore.dispatch(new LaadAgendaEvenementdetails(evenement.id));
    this.router.navigate(['agenda', evenement.id]);
  }

}
