import {Component, Input} from '@angular/core';
import {Link} from '../models/rich-content';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'lg-rich-content-link',
  templateUrl: './rich-content-link.component.html',
  styleUrls: ['./rich-content-link.component.scss']
})
export class RichContentLinkComponent {

  @Input() content: Link;

  constructor(private browser: InAppBrowser) {
  }

  openBrowser(event: Event) {
    this.browser.create(`${this.content.href}`, '_system', 'location=yes');
    event.preventDefault();
  }

}
