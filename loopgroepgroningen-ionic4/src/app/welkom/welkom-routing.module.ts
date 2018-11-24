import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelkomPageComponent} from './welkom-page/welkom-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelkomPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class WelkomRoutingModule {
}
