import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {AgendaClient} from '../services/agenda.client';
import {Evenement} from '../../api';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'lg-agenda-page',
  templateUrl: 'agenda-page.component.html',
  styleUrls: ['agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit {

  evenementen: Observable<Evenement[]>;

  // spinning = true;

  constructor(private agendaClient: AgendaClient, private router: Router) {
  }

  ngOnInit() {
    // this.ingelogd = this.instellingenService.getInstellingen().pipe(
    //   map((instellingen: Instellingen) => instellingen.ingelogd)
    // );
    this.evenementen = this.agendaClient.getAgenda();
  }

  titel(evenement: Evenement) {
    return moment(evenement.start).format('MMMM');
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  onItemClicked(evenement: Evenement) {
    this.router.navigate(['agenda', evenement.id]);
  }

}
