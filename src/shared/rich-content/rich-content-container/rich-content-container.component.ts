import {Component, Input} from '@angular/core';
import {RichContentContainer} from '../shared/rich-content';

@Component({
  selector: 'lg-rich-content-container',
  templateUrl: './rich-content-container.component.html'
})
export class RichContentContainerComponent {

  @Input() content: RichContentContainer;

}
