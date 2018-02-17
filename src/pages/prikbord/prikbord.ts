import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage} from 'ionic-angular';
import {Bericht} from "../../core/bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordService} from "../../core/prikbord.service";
import {InstellingenService} from '../../core/instellingen/instellingen.service';
import {Subject} from 'rxjs/Subject';

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

  constructor(private instellingenService: InstellingenService, private prikbordService: PrikbordService) {
  }

  // TODO: verstuurknop duidelijker stylen (groot blauw vlak als actief) -> en ook bij evenement bericht posten

  ionViewWillEnter() {
    this.ingelogd = this.instellingenService.getInstellingen().map(instellingen => instellingen.ingelogd);
    this.prikbordService.getBerichten()
      .takeUntil(this.destroy)
      .subscribe(items => {
        this.items = items;
        setTimeout(() => {
          this.content.scrollToBottom(this.itemsGeladen ? 300 : 0);
          this.itemsGeladen = true;
        });
    });
  }

  ionViewWillLeave() {
    this.destroy.next(true);
  }

  verstuurBericht() {
    this.aanHetVersturen = true;
    this.prikbordService.verstuurBericht(this.reactie)
      .finally(() => this.aanHetVersturen = null)
      .subscribe(() => {
        this.reactie = '';
      });
  }

}
