import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Nieuwsbericht} from '../shared/nieuwsbericht';

@Component({
  selector: 'lg-nieuwsberichten-lijst',
  templateUrl: './nieuwsberichten-lijst.component.html'
})
export class NieuwsberichtenLijstComponent {

  @Input() nieuwsberichten: Nieuwsbericht[];
  @Output() nieuwsberichtTapped = new EventEmitter<Nieuwsbericht>();

  onTap(nieuwsbericht: Nieuwsbericht) {
    this.nieuwsberichtTapped.emit(nieuwsbericht);
  }
}
