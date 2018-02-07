import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, TextInput} from 'ionic-angular';
import {Bericht} from "../../core/bericht";
import {Observable} from "rxjs/Observable";
import {PrikbordService} from "../../core/prikbord.service";

@IonicPage()
@Component({
  selector: 'page-prikbord',
  templateUrl: 'prikbord.html',
})
export class PrikbordPage implements OnInit {

  items: Observable<Bericht[]>;

  @ViewChild(Content) private content: Content;
  @ViewChild('textarea') private textInput: TextInput;

  private initialized = false;

  constructor(private prikbordService: PrikbordService) {
  }

  ngOnInit() {
    this.items = this.prikbordService.getBerichten();
    this.items.subscribe(values => {
      setTimeout(() => {
        this.content.scrollToBottom(this.initialized ? 300 : 0);
        this.initialized = values.length > 0;
      });
    });
  }
}
