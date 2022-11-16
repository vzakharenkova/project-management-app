import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
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
import { notificationConfigBasic } from 'src/app/shared/utils/noticationConfig';
import { StateModel } from '../state/state.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../selectos/app.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _notification: MatSnackBar,
    private store: Store<StateModel>,
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      tap((action) => localStorage.setItem('login', action.userData.login)),
      switchMap((action) =>
        this.authService.signIn(action.userData).pipe(
          map((tokenObj) => signedIn({ tokenObj })),
          catchError((err) => of(signedInError({ err }))),
        ),
      ),
    );
  });

  signInAfterSignedUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signedUp),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      switchMap((action) =>
        this.authService
          .signIn({ login: <string>action[1]?.login, password: <string>action[1]?.password })
          .pipe(
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
