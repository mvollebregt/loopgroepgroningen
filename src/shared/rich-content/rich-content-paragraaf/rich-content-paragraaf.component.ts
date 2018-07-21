import {Component, Input} from '@angular/core';
import {Paragraaf} from '../shared/rich-content';

@Component({
  selector: 'lg-rich-content-paragraaf',
  templateUrl: './rich-content-paragraaf.component.html'
})
export class RichContentParagraafComponent {

  @Input() content: Paragraaf;

}
