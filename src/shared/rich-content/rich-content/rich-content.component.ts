import {Component, Input} from '@angular/core';
import {RichContent, RichContentType} from '../shared/rich-content';

@Component({
  selector: 'lg-rich-content',
  templateUrl: './rich-content.component.html'
})
export class RichContentComponent {

  RichContentType = RichContentType;

  @Input() content: RichContent[];

}
