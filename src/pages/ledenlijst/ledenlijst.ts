import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage} from 'ionic-angular';
import {LedenlijstClient} from "./ledenlijst.client";
import {Observable} from 'rxjs/Observable';
import {Contact} from './contact';
import {Sectie} from './sectie';

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
    this.items = this.ledenlijstClient.haalLedenOp().map(contacten => {
      // TODO: onderstaande wegabstraheren in service?
      let secties: Sectie<Contact>[] = [];
      let huidigeSectie: Sectie<Contact>;
      for (let contact of contacten) {
        const titel = contact.naam[0].toUpperCase();
        if (huidigeSectie && huidigeSectie.titel === titel) {
          huidigeSectie.inhoud.push(contact);
        } else {
          huidigeSectie = {
            titel: titel,
            inhoud: [contact]
          };
          secties.push(huidigeSectie);
        }
      }
      return secties;
    });
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
