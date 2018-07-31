import {Component, Input} from '@angular/core';
// import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Link} from '../models/rich-content';

@Component({
  selector: 'lg-rich-content-link',
  templateUrl: './rich-content-link.component.html',
  styleUrls: ['./rich-content-link.component.scss']
})
export class RichContentLinkComponent {

  @Input() content: Link;

  // constructor(private browser: InAppBrowser) {
  // }

  openBrowser(event: Event) {
    // this.browser.create(`${this.content.href}`, '_system', 'location=yes');
    // event.preventDefault();
  }

}
