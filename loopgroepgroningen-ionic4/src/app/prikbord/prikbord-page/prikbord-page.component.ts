import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage} from 'ionic-angular';
import {Bericht} from "../../core/bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordService} from "../../core/prikbord.service";
import {InstellingenService} from '../../core/instellingen/instellingen.service';
import {Subject} from 'rxjs/Subject';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {Instellingen} from '../../core/instellingen/instellingen';
import {NotificatieService} from '../../core/notificatie.service';

@IonicPage()
@Component({
  selector: 'page-prikbord',
  templateUrl: 'prikbord.html',
})
export class PrikbordPage {

  destroy = new Subject<boolean>();
  items: Bericht[];
  ingelogd: Observable<boolean>;
  reactie: string;
  aanHetVersturen = false;
  itemsGeladen = false;

  @ViewChild(Content) private content: Content;

  constructor(
    private instellingenService: InstellingenService,
    private notificatieService: NotificatieService,
    private prikbordService: PrikbordService) {
  }

  ionViewWillEnter() {

    this.ingelogd = this.instellingenService.getInstellingen().pipe(
      map((instellingen: Instellingen) => instellingen.ingelogd || instellingen.demoModus)
    );

    this.prikbordService.getBerichten().pipe(
      takeUntil(this.destroy)
    ).subscribe((items: Bericht[]) => {
      this.items = items;
      setTimeout(() => {
        try {
          this.content.scrollToBottom(this.itemsGeladen ? 300 : 0);
        } catch {
          // om onduidelijke redenen geeft de regel hierboven soms een fout. dat los ik dan maar zo op.
        }
        this.itemsGeladen = true;
      });
    });
  }

  ionViewWillLeave() {
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

  testNotificatie() {
    this.notificatieService.testNotificatie();
  }

}
