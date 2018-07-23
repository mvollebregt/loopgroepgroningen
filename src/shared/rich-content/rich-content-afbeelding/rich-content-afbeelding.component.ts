import {Component, Input} from '@angular/core';
import {Afbeelding} from '../shared/rich-content';
import {HttpService} from '../../../core/http.service';

@Component({
  selector: 'lg-rich-content-afbeelding',
  templateUrl: './rich-content-afbeelding.component.html'
})
export class RichContentAfbeeldingComponent {

  @Input() content: Afbeelding;

  readonly backendUrl = HttpService.backendUrl;

}
