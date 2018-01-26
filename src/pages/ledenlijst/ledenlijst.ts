import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage} from 'ionic-angular';
import {LedenlijstClient} from "./ledenlijst.client";
import {Observable} from 'rxjs/Observable';
import {Contact} from './contact';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';

/**
 * Generated class for the LedenlijstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ledenlijst',
  templateUrl: 'ledenlijst.html',
})
export class LedenlijstPage implements OnInit {

  items: Observable<Sectie<Contact>[]>;

  constructor(public actionSheetCtrl: ActionSheetController, private ledenlijstClient: LedenlijstClient) {
  }

  ngOnInit() {
    this.items = this.ledenlijstClient.haalLedenOp().map(
      sectioneer<Contact>(contact => contact.naam[0].toUpperCase()));
  }

  presentActionSheet(item: Contact) {
    let buttons = [];
    if (item.email) {
      buttons.push({
        text: `Mail ${item.email || item.naam}`,
        handler: () => window.location.href= `mailto:${item.email}`
      })
    }
    const telefoon = item.mobiel || item.telefoon;
    if (telefoon) {
      buttons.push({
        text: `Bel ${telefoon}`,
        handler: () => window.location.href = `tel:${telefoon}`
      })
    }
    if (telefoon.startsWith('06')) {
      buttons.push({
        text: 'Stuur SMS',
        handler: () => window.location.href = `sms:${item.mobiel}`
      })
    }
    buttons.push({
      text: 'Annuleer',
      role: 'cancel'
    });
    console.log(buttons);
    const actionSheet = this.actionSheetCtrl.create({buttons: buttons});
    actionSheet.present();
  }

}
