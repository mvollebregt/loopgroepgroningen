import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {Sectie} from '../sectie';

@Component({
  selector: 'lg-sectioned-list',
  templateUrl: './sectioned-list.component.html',
  styleUrls: ['./sectioned-list.component.scss']
})
export class SectionedListComponent<T> {

  @Input() secties: Sectie<T>[];

  @ContentChild(TemplateRef) passedInTemplate: TemplateRef<any>;

}
