import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Evenement} from '../../api';
import * as moment from 'moment';

@Component({
  selector: 'lg-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['agenda-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaViewComponent {

  @Input() evenementen: Evenement[];
  @Output() itemClicked = new EventEmitter<Evenement>();

  titel(evenement: Evenement) {
    return moment(evenement.start).format('MMMM');
  }

  korteWeergave(datumTijd: string) {
    return moment(datumTijd).format('dd D');
  }

  onItemClicked(item: Evenement) {
    this.itemClicked.emit(item);
  }

}
