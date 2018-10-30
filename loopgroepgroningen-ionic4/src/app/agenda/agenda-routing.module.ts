import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgendaPageComponent} from './agenda-page/agenda-page.component';
import {EvenementPage} from './evenement-page/evenement-page.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaPageComponent
  }, {
    path: ':id',
    component: EvenementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule {
}
