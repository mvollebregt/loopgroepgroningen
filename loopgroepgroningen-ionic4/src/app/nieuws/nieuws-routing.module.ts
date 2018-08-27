import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NieuwsoverzichtPageComponent} from './nieuwsoverzicht-page/nieuwsoverzicht-page.component';

const routes: Routes = [
  {
    path: '',
    component: NieuwsoverzichtPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NieuwsRoutingModule {
}
