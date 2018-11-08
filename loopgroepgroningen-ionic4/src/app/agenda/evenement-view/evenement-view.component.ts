import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Evenement} from '../../../../../loopgroepgroningen-backend/functions/src/api/agenda';
import * as moment from 'moment';

@Component({
  selector: 'lg-evenement-view',
  templateUrl: './evenement-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvenementViewComponent implements OnChanges {

  @Input() evenement: Evenement;

  datumweergave: string[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.evenement && this.evenement) {
      this.datumweergave = formatteerDatumtijd(this.evenement.start, this.evenement.einde);
    }
  }
}

function formatteerDatumtijd(start: string, einde: string): string[] {
  const startdatum = moment(start).format('dd D MMM YYYY');
  const starttijd = start.indexOf(':') < 0 ? null : moment(start).format('H:mm');
  const einddatum = moment(einde).format('dd D MMM YYYY');
  const eindtijd = einde.indexOf(':') < 0 ? null : moment(einde).format('H:mm');
  if (startdatum === einddatum) {
    return [startdatum + (starttijd ? `, ${starttijd}` : '') + (eindtijd ? ` - ${eindtijd}` : '')];
  } else {
    return [
      startdatum + (starttijd ? `, ${starttijd}` : ''),
      einddatum + (eindtijd ? ` ${eindtijd}` : '')];
  }
}
