import {Component, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Bericht} from "./shared/bericht";
import {PrikbordClient} from "./shared/prikbord.client";
import {Observable} from "rxjs/Observable";
import {PrikbordService} from "./shared/prikbord.service";

@IonicPage()
@Component({
  selector: 'page-prikbord',
  templateUrl: 'prikbord.html',
})
export class PrikbordPage implements OnInit {

  items: Observable<Bericht[]>;

  constructor(private prikbordService: PrikbordService) {
  }

  ngOnInit() {
    this.items = this.prikbordService.getBerichten();
    this.prikbordService.synchroniseer();
  }
}
