import {Component, Input} from '@angular/core';
import {Nieuwsbericht} from '../../api';
import {CustomDatePipe} from '../../shared/shared/pipes/custom-date-pipe';

@Component({
  selector: 'lg-nieuwsbericht-detail',
  templateUrl: './nieuwsbericht-detail.component.html'
})
export class NieuwsberichtDetailComponent {

  @Input() nieuwsbericht: Nieuwsbericht;

  titel(): string {
    return this.nieuwsbericht.datum && CustomDatePipe.transform(this.nieuwsbericht.datum, "D MMMM YYYY");
  }

}
