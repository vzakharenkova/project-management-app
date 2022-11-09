import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { signIn, signUp } from '../actions/auth.actions';

export enum AuthApiActionsList {
  signedIn = '[AUTH API] Sign in success',
  signedInError = '[AUTH API] Sign in error',
  signedUp = '[AUTH API] Sign up success',
  signedUpError = '[AUTH API] Sign up error',
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      switchMap((action) =>
        this.authService.signIn(action.userData).pipe(
          map((tokenObj) => ({ type: AuthApiActionsList.signedIn, tokenObj })),
          catchError((err) => of({ type: AuthApiActionsList.signedInError, err })),
        ),
      ),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap((action) =>
        this.authService.signUp(action.newUserData).pipe(
          map((user) => ({ type: AuthApiActionsList.signedUp, user })),
          catchError((err) => of({ type: AuthApiActionsList.signedUpError, err })),
        ),
      ),
    );
  });
}
