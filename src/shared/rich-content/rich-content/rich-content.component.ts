import {Component, Input} from '@angular/core';
import {RichContentType} from '../shared/rich-content';
import {Paragraaf} from '../shared/paragraaf';

@Component({
  selector: 'lg-rich-content',
  templateUrl: './rich-content.component.html'
})
export class RichContentComponent {

  RichContentType = RichContentType;

  @Input() paragrafen: Paragraaf[];

}
