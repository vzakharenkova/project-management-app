import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { signIn, signUp } from '../actions/auth.actions';
import {
  AuthApiActionsList,
  signedIn,
  signedInError,
  signedUp,
  signedUpError,
} from '../actions/auth-api.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

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

  signUpRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedUp),
        tap(() => {
          this.router.navigateByUrl('/auth/login');
        }),
      );
    },
    { dispatch: false },
  );

  signInRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedIn),
        tap((action: { tokenObj: { token: string }; type: AuthApiActionsList.signedIn }) => {
          this.router.navigateByUrl('/boards');
          localStorage.setItem('token', action.tokenObj.token);
        }),
      );
    },
    { dispatch: false },
  );
}
