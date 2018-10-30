import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {OpknipperService} from '../opknipper.service';
import {Sectie} from '../../../api';

@Component({
  selector: 'lg-sectioned-list',
  templateUrl: './sectioned-list.component.html'
})
export class SectionedListComponent<T> implements OnChanges {

  @Input() data: T[];
  @Input() sectieTitel: (item: T) => string;
  @Input() secties: Sectie<T>[];
  @Input() getId: (item: T) => any;

  @Output() itemClicked = new EventEmitter<T>();

  @ContentChild(TemplateRef) passedInTemplate: TemplateRef<any>;

  constructor(private opknipperService: OpknipperService) {
  }

  trackByFn(index: number, item: T) {
    // TODO: domeinobjecten standaard 'id'-property geven zodat we this.getId niet nodig hebben?
    return this.getId && this.getId(item);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data || changes.sectieTitel) {
      this.secties = this.opknipperService.maakSecties(this.data, this.sectieTitel);
    }
  }

  onClick(item: T) {
    this.itemClicked.emit(item);
  }
}
