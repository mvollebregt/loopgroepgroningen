import {Component, Input} from '@angular/core';
import {Bericht} from '../../../../../../loopgroepgroningen-backend/functions/src/api/bericht';

@Component({
  selector: 'lg-gesprek',
  templateUrl: './gesprek.component.html',
  styleUrls: ['./gesprek.component.scss']
})
export class GesprekComponent {

  @Input() berichten: Bericht[];

}
