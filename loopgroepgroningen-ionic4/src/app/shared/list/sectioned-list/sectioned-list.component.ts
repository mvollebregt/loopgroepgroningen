import {Component, ContentChild, Input, OnChanges, TemplateRef} from '@angular/core';
import {Sectie} from '../sectie';
import {OpknipperService} from '../opknipper.service';

@Component({
  selector: 'lg-sectioned-list',
  templateUrl: './sectioned-list.component.html',
  styleUrls: ['./sectioned-list.component.scss']
})
export class SectionedListComponent<T> implements OnChanges {

  @Input() data: T[];
  @Input() sectieTitel: (item: T) => string;

  @ContentChild(TemplateRef) passedInTemplate: TemplateRef<any>;

  secties: Sectie<T>[];

  constructor(private opknipperService: OpknipperService) {
  }

  ngOnChanges() {
    this.secties = this.opknipperService.maakSecties(this.data, this.sectieTitel);
  }

}
