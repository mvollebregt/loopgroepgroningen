import {Component, Input} from '@angular/core';
import {Content} from './content';

@Component({
  selector: 'lg-content',
  templateUrl: './content.component.html'
})
export class ContentComponent {

  @Input() content: Content;

}
