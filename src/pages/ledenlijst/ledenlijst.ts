import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LedenlijstClient} from "./ledenlijst.client";
import {Contact} from '../../core/contacten/contact';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';
import {ContactoptiesService} from '../../core/contacten/contactopties.service';

@IonicPage()
@Component({
  selector: 'page-ledenlijst',
  templateUrl: 'ledenlijst.html',
})
export class LedenlijstPage {

  zoekterm: string;
  items: Sectie<Contact>[];
  spinning = true;

  constructor(public contactoptiesService: ContactoptiesService, private ledenlijstClient: LedenlijstClient) {
  }

  ionViewDidLoad() {
    this.ledenlijstClient.haalLedenOp()
      .map(sectioneer<Contact>(contact => contact.naam[0].toUpperCase()))
      // TODO: spinning ook op false zetten bij fout
      .subscribe(items => {
        this.items = items;
        // TODO: spinning ook op false zetten bij fout
        this.spinning = false;
      });
  }

  voldoetAanZoekterm(naam: string) {
    return !this.zoekterm ||
      naam.split(' ').find(deel => deel.toLowerCase().startsWith(this.zoekterm.toLowerCase()))
  }

  presentActionSheet(item: Contact) {
    this.contactoptiesService.presentActionSheet(item);
  }
}
