import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage} from 'ionic-angular';
import {Bericht} from "../../core/bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordService} from "../../core/prikbord.service";
import {InstellingenService} from '../../core/instellingen/instellingen.service';

@IonicPage()
@Component({
  selector: 'page-prikbord',
  templateUrl: 'prikbord.html',
})
export class PrikbordPage {

  items: Observable<Bericht[]>;
  ingelogd: Observable<boolean>;
  reactie: string;
  aanHetVersturen = false;

  @ViewChild(Content) private content: Content;

  constructor(private instellingenService: InstellingenService, private prikbordService: PrikbordService) {
  }

  // TODO: verstuurknop duidelijker stylen (groot blauw vlak als actief) -> en ook bij evenement bericht posten

  ionViewDidLoad() {
    this.ingelogd = this.instellingenService.getInstellingen().map(instellingen => instellingen.ingelogd);
    this.items = this.prikbordService.getBerichten();
    this.items.subscribe(() => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(0);
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
