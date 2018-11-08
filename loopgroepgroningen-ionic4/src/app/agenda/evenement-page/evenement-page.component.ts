import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Evenement} from '../../api';
import {ActivatedRoute} from '@angular/router';
import {AgendaState, getAgendaEvenement} from '../store/agenda.state';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'lg-evenement-page',
  templateUrl: 'evenement-page.component.html',
})
export class EvenementPage implements OnInit, OnDestroy {

  evenement: Evenement;
  datumweergave: string[];
  reactie: string;
  aanHetAanmelden = false;
  aanHetVersturen = false;
  spinning = true;

  private destroyed = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendaStore: Store<AgendaState>
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.agendaStore.pipe(
      select(getAgendaEvenement(id)),
      takeUntil(this.destroyed)
    ).subscribe(evenement => this.toonEvenement(evenement));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  toggleDeelname() {
    if (this.evenement) {
      this.aanHetAanmelden = true;
      // this.agendaClient.schrijfIn(this.evenement, !this.evenement.details.deelname)
      //   .subscribe(evenement => {
      //     this.aanHetAanmelden = false;
      //     this.toonEvenement(evenement)
      //   });
    }
  }

  // verstuurBericht() {
  //   this.aanHetVersturen = true;
  //   this.evenementdetailClient.verstuurBericht(this.navParams.get('url'), this.reactie).pipe(
  //       finalize(() => this.aanHetVersturen = null)
  //     ).subscribe((evenement : Evenementdetail) => {
  //       this.toonEvenement(evenement);
  //       this.reactie = '';
  //     });
  // }

  private toonEvenement(evenement: Evenement) {
    if (evenement) {
      this.evenement = evenement;
      this.datumweergave = formatteerDatumtijd(evenement.start, evenement.einde);
    }
  }
}

function formatteerDatumtijd(start: string, einde: string): string[] {
  const startdatum = moment(start).format('dd D MMM YYYY');
  const starttijd = start.indexOf(':') < 0 ? null : moment(start).format('H:mm');
  const einddatum = moment(einde).format('dd D MMM YYYY');
  const eindtijd = einde.indexOf(':') < 0 ? null : moment(einde).format('H:mm');
  if (startdatum === einddatum) {
    return [startdatum + (starttijd ? `, ${starttijd}` : '') + (eindtijd ? ` - ${eindtijd}` : '')];
  } else {
    return [
      startdatum + (starttijd ? `, ${starttijd}` : ''),
      einddatum + (eindtijd ? ` ${eindtijd}` : '')];
  }
}
