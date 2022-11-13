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
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {
  notificationConfigBasic,
  notificationConfigErr,
} from 'src/app/shared/utils/noticationConfig';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _notification: MatSnackBar,
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
          this._notification.open('Sign up successfully', '', notificationConfigBasic);
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

  signUpError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedUpError),
        tap((action: { err: HttpErrorResponse; type: AuthApiActionsList.signedUpError }) => {
          if (action.err.error.statusCode === 409) {
            this._notification.open(
              'User login already exists. Please change login and try again',
              '',
              notificationConfigErr,
            );
          } else {
            this._notification.open(
              'Something goes wrong. Please try again',
              '',
              notificationConfigErr,
            );
          }
        }),
      );
    },
    { dispatch: false },
  );

  signInError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedInError),
        tap((action: { err: HttpErrorResponse; type: AuthApiActionsList.signedInError }) => {
          if (action.err.error.statusCode === 403) {
            this._notification.open(
              'This user does not exist. Please sing up',
              '',
              notificationConfigErr,
            );
          } else {
            this._notification.open(
              'Something goes wrong. Please try again',
              '',
              notificationConfigErr,
            );
          }
        }),
      );
    },
    { dispatch: false },
  );
}
