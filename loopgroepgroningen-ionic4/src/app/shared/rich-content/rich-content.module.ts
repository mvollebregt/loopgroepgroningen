import {NgModule} from '@angular/core';
import {RichContentComponent} from './rich-content/rich-content.component';
import {SharedModule} from '../shared/shared.module';
import {RichContentAfbeeldingComponent} from './rich-content-afbeelding/rich-content-afbeelding.component';
import {RichContentLinkComponent} from './rich-content-link/rich-content-link.component';

const directives = [RichContentComponent];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    RichContentAfbeeldingComponent,
    RichContentLinkComponent,
    ...directives
  ],
  exports: directives
})
export class RichContentModule {
}
