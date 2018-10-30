import {Component, Input} from '@angular/core';
import {Afbeelding} from '../../../api';

@Component({
  selector: 'lg-rich-content-afbeelding',
  templateUrl: './rich-content-afbeelding.component.html',
  styleUrls: ['./rich-content-afbeelding.component.scss']
})
export class RichContentAfbeeldingComponent {

  @Input() content: Afbeelding;

  readonly backendUrl = 'https://www.loopgroepgroningen.nl';

}
