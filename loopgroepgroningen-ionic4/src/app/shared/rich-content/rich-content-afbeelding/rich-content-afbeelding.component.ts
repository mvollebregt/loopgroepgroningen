import {Component, Input} from '@angular/core';
import {Afbeelding} from '../../../../../../loopgroepgroningen-backend/functions/src/api/rich-content/rich-content';
import {HttpService} from '../../backend/services/http.service';

@Component({
  selector: 'lg-rich-content-afbeelding',
  templateUrl: './rich-content-afbeelding.component.html',
  styleUrls: ['./rich-content-afbeelding.component.scss']
})
export class RichContentAfbeeldingComponent {

  @Input() content: Afbeelding;

  readonly backendUrl = HttpService.backendUrl;

}
