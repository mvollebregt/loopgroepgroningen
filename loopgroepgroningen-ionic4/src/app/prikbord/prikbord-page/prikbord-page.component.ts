import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Content} from '@ionic/angular';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {PrikbordService} from '../services/prikbord.service';
import {Bericht} from '../../shared/berichten/models/bericht';

@Component({
    selector: 'lg-prikbord-page',
    templateUrl: './prikbord-page.component.html'
})
export class PrikbordPageComponent implements OnInit, OnDestroy {

  destroy = new Subject<boolean>();
  items: Bericht[];
  ingelogd: Observable<boolean>;
  reactie: string;
  aanHetVersturen = false;
  itemsGeladen = false;

  @ViewChild(Content) private content: Content;

  constructor(
    // private instellingenService: InstellingenService,
    private prikbordService: PrikbordService) {
  }

  ngOnInit() {

    // this.ingelogd = this.instellingenService.getInstellingen().pipe(
    //   map((instellingen: Instellingen) => instellingen.ingelogd || instellingen.demoModus)
    // );

    this.prikbordService.getBerichten().pipe(
      takeUntil(this.destroy)
    ).subscribe((items: Bericht[]) => {
      this.items = items;
      setTimeout(() => {
        try {
          this.content.getScrollElement().scrollToBottom(this.itemsGeladen ? 300 : 0);
        } catch {
          // om onduidelijke redenen geeft de regel hierboven soms een fout. dat los ik dan maar zo op.
        }
        this.itemsGeladen = true;
      });
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  verstuurBericht() {
    this.aanHetVersturen = true;
    this.prikbordService.verstuurBericht(this.reactie).pipe(
      finalize(() => this.aanHetVersturen = null)
    ).subscribe(() => {
      this.reactie = '';
    });
  }
}
