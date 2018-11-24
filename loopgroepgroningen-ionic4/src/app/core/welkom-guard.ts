import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getAuthenticatieIngelogd} from './store/authenticatie/authenticatie.state';
import {filter, first, take, tap} from 'rxjs/operators';
import {CoreState} from './store/core.state';
import {Location} from '@angular/common';

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
    return this.store.pipe(
      select(getAuthenticatieIngelogd),
      first(ingelogd => ingelogd !== null),
      tap(ingelogd => {
        if (!ingelogd) {
          this.router.navigate(['welkom'], {skipLocationChange: true});
          this.overschrijfUrl(routerState.url);
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
