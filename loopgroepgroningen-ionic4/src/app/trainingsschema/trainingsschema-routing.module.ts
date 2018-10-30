import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingsschemaPageComponent} from './trainingsschema-page/trainingsschema-page.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingsschemaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TrainingsschemaRoutingModule {
}
