import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelkomGuard} from './core/welkom-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prikbord',
    pathMatch: 'full'
  },
  {
    path: 'nieuws',
    loadChildren: './nieuws/nieuws.module#NieuwsModule',
    canActivate: [WelkomGuard]
  },
  {
    path: 'prikbord',
    loadChildren: './prikbord/prikbord.module#PrikbordModule',
    canActivate: [WelkomGuard]
  },
  {
    path: 'agenda',
    loadChildren: './agenda/agenda.module#AgendaModule',
    canActivate: [WelkomGuard]
  },
  {
    path: 'trainingsschema',
    loadChildren: './trainingsschema/trainingsschema.module#TrainingsschemaModule',
    canActivate: [WelkomGuard]
  },
  {
    path: 'welkom',
    loadChildren: './welkom/welkom.module#WelkomModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
