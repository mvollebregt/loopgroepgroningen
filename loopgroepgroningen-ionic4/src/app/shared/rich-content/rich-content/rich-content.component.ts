import {Component, Input} from '@angular/core';
import {Paragraaf} from '../models/paragraaf';
import {RichContentType} from '../models/rich-content';

@Component({
  selector: 'lg-rich-content',
  templateUrl: './rich-content.component.html',
  styleUrls: ['./rich-content.component.scss']
})
export class RichContentComponent {

  RichContentType = RichContentType;

  @Input() paragrafen: Paragraaf[];

}
