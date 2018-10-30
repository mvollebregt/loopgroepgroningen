import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NieuwsoverzichtPageComponent} from './nieuwsoverzicht-page/nieuwsoverzicht-page.component';
import {NieuwsberichtPageComponent} from './nieuwsbericht-page/nieuwsbericht-page.component';

const routes: Routes = [
  {
    path: '',
    component: NieuwsoverzichtPageComponent
  }, {
    path: ':id',
    component: NieuwsberichtPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NieuwsRoutingModule {
}
