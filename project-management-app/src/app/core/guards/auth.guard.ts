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
import { map, Observable, tap } from 'rxjs';
import { selectToken } from '../store/selectos/app.selectors';
import { StateModel } from '../store/state/state.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<StateModel>) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      map((token) => {
        if (token === null) {
          this.router.navigateByUrl('/welcome');
          return false;
        }
        return true;
      }),
    );
  }
}
