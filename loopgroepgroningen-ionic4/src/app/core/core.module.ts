import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {coreReducers} from './store/core.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('core', coreReducers)
  ]
})
export class CoreModule {
}
