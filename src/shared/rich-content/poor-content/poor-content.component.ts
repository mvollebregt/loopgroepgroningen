import {Component, Input} from '@angular/core';

@Component({
  selector: 'lg-poor-content',
  templateUrl: './poor-content.component.html'
})
export class PoorContentComponent {

  @Input() content: string[];

}
