import {Component, Input} from '@angular/core';
import {Nieuwsbericht} from '../nieuwsbericht';

@Component({
  selector: 'lgg-nieuwslijst',
  templateUrl: './nieuwslijst.component.html'
})
export class NieuwslijstComponent {

  @Input() nieuwsberichten: Nieuwsbericht[];

}
