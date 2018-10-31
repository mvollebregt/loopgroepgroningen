import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Evenement} from '../../api';
import {AgendaClient} from '../services/agenda.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lg-evenement-page',
  templateUrl: 'evenement-page.component.html',
})
export class EvenementPage implements OnInit {

  evenement: Evenement;
  datumweergave: string[];
  reactie: string;
  aanHetAanmelden = false;
  aanHetVersturen = false;
  spinning = true;

  constructor(
    private agendaClient: AgendaClient,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.agendaClient.getEvenement(id).subscribe(evenement => this.toonEvenement(evenement));
  }

  toggleDeelname() {
    if (this.evenement) {
      this.aanHetAanmelden = true;
      this.agendaClient.schrijfIn(this.evenement, !this.evenement.details.deelname)
        .subscribe(evenement => {
          this.aanHetAanmelden = false;
          this.toonEvenement(evenement)
        });
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
    this.evenement = evenement;
    this.datumweergave = formatteerDatumtijd(evenement.start, evenement.einde);
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
