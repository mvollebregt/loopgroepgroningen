import {Component, Input} from '@angular/core';
import {Nieuwsbericht} from '../../api';

@Component({
  selector: 'lg-nieuwsbericht-detail',
  templateUrl: './nieuwsbericht-detail.component.html'
})
export class NieuwsberichtDetailComponent {

  @Input() nieuwsbericht: Nieuwsbericht;

}
