import { Component } from '@angular/core';
import {ActionSheetController, IonicPage} from 'ionic-angular';
import {LedenlijstClient} from "./ledenlijst.client";

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
export class LedenlijstPage {

  constructor(public actionSheetCtrl: ActionSheetController, private ledenlijstClient: LedenlijstClient) {
    this.ledenlijstClient.haalLedenOp().subscribe(console.log);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Kees Beentjes',
      buttons: [
        {
          text: 'Mail kees@beentjes.net',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Bel 06-12345678',
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
