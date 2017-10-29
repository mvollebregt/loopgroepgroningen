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

  @ViewChild(Content) private content: Content;

  items: Observable<Bericht[]>;

  private initialized = false;
  private contentHeight = -1;

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

  resize(input: TextInput): void {
    setTimeout(() => {
      let textArea = input.getNativeElement().querySelector('textArea');
      textArea.style.overflow = "hidden";
      textArea.style.height = "auto";
      textArea.style.height = Math.min(textArea.scrollHeight, 165) + "px";
      if (this.contentHeight === -1) {
        this.contentHeight = this.content.contentHeight;
      }
      this.content.resize();
      let scrollTopBefore = this.content.getContentDimensions().scrollTop;
      setTimeout(() => {
        let newHeight = this.content.contentHeight;
        let scrollTop = this.content.getContentDimensions().scrollTop;
        if (scrollTop === scrollTopBefore) {
          this.content.scrollTo(0, scrollTop - newHeight + this.contentHeight, 0);
        }
        this.contentHeight = newHeight;
      });
    });
  }
}
