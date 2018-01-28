import {Injectable} from '@angular/core';
import {Contact} from './contact';
import {ActionSheetController} from 'ionic-angular';

@Injectable()
export class ContactoptiesService {

  constructor(private actionSheetCtrl: ActionSheetController) {
  }

  presentActionSheet(item: Contact) {
    let buttons = [];
    if (item.email) {
      buttons.push(ContactoptiesService.emailButton(item.email));
    }
    if (item.telefoon) {
      buttons.push(ContactoptiesService.telefoonButton(item.telefoon));
    }
    if (item.mobiel) {
      buttons.push(ContactoptiesService.telefoonButton(item.mobiel));
      buttons.push(ContactoptiesService.smsButton(item.mobiel));
    }
    buttons.push({
      text: 'Annuleer',
      role: 'cancel'
    });
    const actionSheet = this.actionSheetCtrl.create({buttons: buttons});
    actionSheet.present();
  }

  private static emailButton(email: string) {
    return {
      text: `Mail ${email}`,
      handler: () => window.location.href = `mailto:${email}`
    };
  }

  private static telefoonButton(telefoon: string) {
    return {
      text: `Bel ${telefoon}`,
      handler: () => window.location.href = `tel:${telefoon}`
    };
  }

  private static smsButton(mobiel: string) {
    return {
      text: 'Stuur SMS',
      handler: () => window.location.href = `sms:${mobiel}`
    };
  }



}
