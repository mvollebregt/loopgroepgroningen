import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  constructor(private prikbordService: PrikbordService, private changeDetector: ChangeDetectorRef) {
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

  // TODO: hier een attribute directive van maken
  resize(input: TextInput): void {
    let textArea = input.getNativeElement().querySelector('textarea');
    textArea.style.overflow = "hidden";
    textArea.style.height = "auto";
    textArea.style.height = Math.min(textArea.scrollHeight, 165) + "px";
    this.content.scrollToBottom(0);
  }
}
