import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../../shared/models/user.model';

export enum AuthApiActionsList {
  signedIn = '[AUTH API] Sign in success',
  signedInError = '[AUTH API] Sign in error',
  signedUp = '[AUTH API] Sign up success',
  signedUpError = '[AUTH API] Sign up error',
}

export const signedIn = createAction(
  AuthApiActionsList.signedIn,
  props<{ tokenObj: { token: string } }>(),
);

export const signedInError = createAction(
  AuthApiActionsList.signedInError,
  props<{ err: Error }>(),
);

export const signedUp = createAction(AuthApiActionsList.signedUp, props<{ user: UserModel }>());

export const signedUpError = createAction(
  AuthApiActionsList.signedUpError,
  props<{ err: Error }>(),
);
