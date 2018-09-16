import {NgModule} from '@angular/core';
import {SectionedListComponent} from './sectioned-list/sectioned-list.component';
import {SharedModule} from '../shared/shared.module';

const exportedComponents = [SectionedListComponent];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: exportedComponents,
  exports: exportedComponents
})
export class ListModule {
}
