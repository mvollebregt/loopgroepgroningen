import {Component, Input} from '@angular/core';
import {Link} from '../shared/rich-content';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Component({
  selector: 'lg-rich-content-link',
  templateUrl: './rich-content-link.component.html'
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
