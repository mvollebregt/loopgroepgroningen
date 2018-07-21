import {Component, Input} from '@angular/core';
import {RichContent} from './rich-content';

@Component({
  selector: 'lg-rich-content',
  templateUrl: './rich-content.component.html'
})
export class RichContentComponent {

  @Input() content: RichContent;

}
