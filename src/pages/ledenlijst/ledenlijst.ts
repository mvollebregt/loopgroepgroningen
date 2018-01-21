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
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Kees Beentjes',
      buttons: [
        {
          text: `Mail ${item.email || item.naam}`,
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: `Bel ${item.mobiel || item.telefoon}`,
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Stuur SMS',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Annuleer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
