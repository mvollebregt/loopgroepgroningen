import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prikbord',
    pathMatch: 'full'
  },
  {
    path: 'nieuws',
    loadChildren: './nieuws/nieuws.module#NieuwsModule'
  },
  {
    path: 'prikbord',
    loadChildren: './prikbord/prikbord.module#PrikbordModule'
  },
  {
    path: 'trainingsschema',
    loadChildren: './trainingsschema/trainingsschema.module#TrainingsschemaModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
