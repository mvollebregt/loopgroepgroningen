import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, map, take} from 'rxjs/operators';
import {CoreState} from './store/core.state';
import {Location} from '@angular/common';
import {getAuthenticatieState} from './store/authenticatie/authenticatie.state';
import {Module} from '../../../../loopgroepgroningen-backend/functions/src/api/session';

@Injectable({
  providedIn: 'root'
})
export class WelkomGuard implements CanActivate {

  constructor(
    private location: Location,
    private router: Router,
    private store: Store<CoreState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    const module = route.routeConfig.path as Module;
    return this.store.pipe(
      select(getAuthenticatieState),
      first(state => state.geinitialiseerd),
      map(state => state.session),
      map(session => {
        if (!session) {
          // geen sessie -> ga naar inlogscherm
          this.router.navigate(['welkom'], {skipLocationChange: true});
          this.overschrijfUrl(routerState.url);
          return false;
        } else if (session.toegestaneModules && session.toegestaneModules.indexOf(module) < 0) {
          // geen toegang tot module -> ga naar prikbord
          this.router.navigate(['prikbord']);
          return false;
        } else {
          // alles ok -> ga door
          return true;
        }
      })
    );
  }

  // hack omdat skipLocationChange niet werkt binnen een guard
  // (https://github.com/angular/angular/issues/16981#issuecomment-397218203)
  private overschrijfUrl(url: string) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    ).subscribe(() => this.location.replaceState(url));
  }
}
