import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Evenement} from '../../api';
import {ActivatedRoute} from '@angular/router';
import {AgendaState, getAgendaEvenement} from '../store/agenda.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'lg-evenement-page',
  templateUrl: 'evenement-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvenementPage implements OnInit {

  evenement: Observable<Evenement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendaStore: Store<AgendaState>
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.evenement = this.agendaStore.pipe(select(getAgendaEvenement(id)));
  }

  toggleDeelname() {
    if (this.evenement) {
      // this.aanHetAanmelden = true;
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
}
