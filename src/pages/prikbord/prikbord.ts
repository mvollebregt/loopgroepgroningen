import {Component, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Bericht} from "../../providers/prikbord/bericht";
import {PrikbordProvider} from "../../providers/prikbord/prikbord";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the PrikbordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prikbord',
  templateUrl: 'prikbord.html',
})
export class PrikbordPage implements OnInit {

  items: Observable<Bericht[]>;

  constructor(private prikbord: PrikbordProvider) {
  }

  ngOnInit() {
    this.items = this.prikbord.haalBerichtenOp();
  }
}
