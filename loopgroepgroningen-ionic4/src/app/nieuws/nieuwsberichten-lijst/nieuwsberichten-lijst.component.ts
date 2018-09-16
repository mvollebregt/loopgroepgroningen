import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Nieuwsbericht} from '../../api';
import {Sectie} from '../../shared/list/sectie';
import {CustomDatePipe} from '../../shared/shared/pipes/custom-date-pipe';

@Component({
  selector: 'lg-nieuwsberichten-lijst',
  templateUrl: './nieuwsberichten-lijst.component.html',
  styleUrls: ['./nieuwsberichten-lijst.component.scss']
})
export class NieuwsberichtenLijstComponent implements OnChanges {

  @Input() nieuwsberichten: Nieuwsbericht[];
  @Output() nieuwsberichtTapped = new EventEmitter<Nieuwsbericht>();

  secties: Sectie<Nieuwsbericht>[];

  constructor(private datePipe: CustomDatePipe) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nieuwsberichten && this.nieuwsberichten[0]) {
      this.secties = [{
        titel: this.datePipe.transform(this.nieuwsberichten[0].datum, 'MMMM YYYY'),
        inhoud: this.nieuwsberichten
      }];
    }
  }

  onTap(nieuwsbericht: Nieuwsbericht) {
    this.nieuwsberichtTapped.emit(nieuwsbericht);
  }
}
