import {Component, Input} from '@angular/core';
import {Nieuwsbericht} from '../models/nieuwsbericht';

@Component({
  selector: 'lg-nieuwsberichten-lijst',
  templateUrl: './nieuwsberichten-lijst.component.html'
})
export class NieuwsberichtenLijstComponent {

  @Input() nieuwsberichten: Nieuwsbericht[];

}
