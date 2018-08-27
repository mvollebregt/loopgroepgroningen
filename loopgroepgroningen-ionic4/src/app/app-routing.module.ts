import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prikbord',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'list/:id',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'nieuws',
    loadChildren: './nieuws/nieuws.module#NieuwsModule'
  },
  {
    path: 'prikbord',
    loadChildren: './prikbord/prikbord.module#PrikbordModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
