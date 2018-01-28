import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LedenlijstClient} from "./ledenlijst.client";
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../core/contacten/contact';
import {Sectie} from '../../core/sectie';
import {sectioneer} from '../../core/sectioneer';
import {ContactoptiesService} from '../../core/contacten/contactopties.service';

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

  constructor(public contactoptiesService: ContactoptiesService, private ledenlijstClient: LedenlijstClient) {
  }

  ngOnInit() {
    this.items = this.ledenlijstClient.haalLedenOp().map(
      sectioneer<Contact>(contact => contact.naam[0].toUpperCase()));
  }

  presentActionSheet(item: Contact) {
    this.contactoptiesService.presentActionSheet(item);
  }
}
