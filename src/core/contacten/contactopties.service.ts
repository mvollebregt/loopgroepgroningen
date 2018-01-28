import {Injectable} from '@angular/core';
import {Contact} from './contact';
import {ActionSheetController, AlertController, Platform} from 'ionic-angular';
import {ContactField, ContactName, Contacts} from "@ionic-native/contacts";

@Injectable()
export class ContactoptiesService {

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private contacts: Contacts,
    private platform: Platform) {
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
    if (this.platform.is('cordova')) {
      buttons.push(this.opslaanButton(item));
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

  private opslaanButton(item: Contact) {
    return {
      text: 'Voeg toe aan adresboek',
      handler: () => this.voegToeAanAdresboek(item)
    }
  }

  private voegToeAanAdresboek(item: Contact) {
    let contact = this.contacts.create();
    const separator = item.naam.indexOf(' ');
    contact.name = new ContactName(item.naam, item.naam.substring(separator + 1), item.naam.substring(0, separator));
    contact.organizations = [{name: 'Loopgroep Groningen'}];
    contact.phoneNumbers = [];
    if (item.telefoon) {
      contact.phoneNumbers.push(new ContactField('thuis', item.telefoon));
    }
    if (item.mobiel) {
      contact.phoneNumbers.push(new ContactField('mobiel', item.mobiel));
    }
    if (item.email) {
      contact.emails = [new ContactField('thuis', item.email)];
    }
    contact.save().then(
      () => this.alertController.create({
        title: 'Opgeslagen',
        message: `${item.naam} is toegevoegd aan je adresboek.`,
        buttons: ['Ok']
      }).present(),
      (error: any) => this.alertController.create({
        title: 'Fout',
        message: `${item.naam} kon niet worden toegevoegd.`,
        buttons: ['Ok']
      }).present()
    );
  }
}
