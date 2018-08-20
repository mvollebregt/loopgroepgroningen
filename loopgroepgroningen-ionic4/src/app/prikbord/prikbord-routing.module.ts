import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrikbordPageComponent} from './prikbord-page/prikbord-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrikbordPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrikbordRoutingModule {
}
