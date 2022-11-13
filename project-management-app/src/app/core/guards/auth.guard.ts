/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/selectos/app.selectors';
import { StateModel } from '../store/state/state.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private store: Store<StateModel>) {}

  canLoad(_route: Route, _segments: UrlSegment[]): boolean {
    const token = this.store.select(selectToken);
    if (!token) {
      this.router.navigateByUrl('/welcom');
    }

    return !!token;
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const token = this.store.select(selectToken);
    if (!token) {
      this.router.navigateByUrl('/welcom');
    }

    return !!token;
  }
}
