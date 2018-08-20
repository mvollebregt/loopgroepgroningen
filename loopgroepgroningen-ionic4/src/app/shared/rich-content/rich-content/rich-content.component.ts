import {Component, Input} from '@angular/core';
import {Paragraaf} from '../../../../../../loopgroepgroningen-backend/functions/src/api/rich-content/paragraaf';
import {RichContentType} from '../../../../../../loopgroepgroningen-backend/functions/src/api/rich-content/rich-content';

@Component({
  selector: 'lg-rich-content',
  templateUrl: './rich-content.component.html',
  styleUrls: ['./rich-content.component.scss']
})
export class RichContentComponent {

  RichContentType = RichContentType;

  @Input() paragrafen: Paragraaf[];

}
