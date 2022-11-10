import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { signIn, signUp } from '../actions/auth.actions';
import { signedIn, signedInError, signedUp, signedUpError } from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      switchMap((action) =>
        this.authService.signIn(action.userData).pipe(
          map((tokenObj) => signedIn({ tokenObj })),
          catchError((err) => of(signedInError({ err }))),
        ),
      ),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap((action) =>
        this.authService.signUp(action.newUserData).pipe(
          map((user) => signedUp({ user })),
          catchError((err) => of(signedUpError({ err }))),
        ),
      ),
    );
  });
}
