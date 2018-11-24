import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {WelkomGuard} from './core/welkom-guard';
import {Module} from '../../../loopgroepgroningen-backend/functions/src/api/session';

export interface Menuitem extends Route {
  naam: string;
  path: Module;
  icoon: string;
}

export const hoofdmenuitems: Menuitem[] = [
  {
    naam: 'Nieuws',
    icoon: 'paper',
    path: 'nieuws',
    loadChildren: './nieuws/nieuws.module#NieuwsModule',
    canActivate: [WelkomGuard]
  },
  {
    naam: 'Prikbord',
    icoon: 'chatboxes',
    path: 'prikbord',
    loadChildren: './prikbord/prikbord.module#PrikbordModule',
    canActivate: [WelkomGuard]
  },
  {
    naam: 'Agenda',
    icoon: 'calendar',
    path: 'agenda',
    loadChildren: './agenda/agenda.module#AgendaModule',
    canActivate: [WelkomGuard]
  },
  {
    naam: 'Trainingsschema',
    icoon: 'grid',
    path: 'trainingsschema',
    loadChildren: './trainingsschema/trainingsschema.module#TrainingsschemaModule',
    canActivate: [WelkomGuard]
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prikbord',
    pathMatch: 'full',
  },
  {
    path: 'welkom',
    loadChildren: './welkom/welkom.module#WelkomModule'
  },
  ...hoofdmenuitems
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
