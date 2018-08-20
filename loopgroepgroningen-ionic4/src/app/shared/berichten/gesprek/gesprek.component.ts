import {Component, Input} from '@angular/core';
import {Bericht} from '../../../api';

@Component({
  selector: 'lg-gesprek',
  templateUrl: './gesprek.component.html',
  styleUrls: ['./gesprek.component.scss']
})
export class GesprekComponent {

  @Input() berichten: Bericht[];

}
