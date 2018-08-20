import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Nieuwsbericht} from '../shared/nieuwsbericht';
import {HttpService} from '../../../core/http.service';

@Component({
  selector: 'lg-nieuwsberichten-lijst',
  templateUrl: './nieuwsberichten-lijst.component.html'
})
export class NieuwsberichtenLijstComponent {

  @Input() nieuwsberichten: Nieuwsbericht[];
  @Output() nieuwsberichtTapped = new EventEmitter<Nieuwsbericht>();

  readonly backendUrl = HttpService.backendUrl;

  onTap(nieuwsbericht: Nieuwsbericht) {
    this.nieuwsberichtTapped.emit(nieuwsbericht);
  }
}
