import { createAction, props } from '@ngrx/store';

export const signUp = createAction(
  '[AUTH] Create new account',
  props<{ name: string; login: string; password: string }>(),
);

export const signIn = createAction(
  '[AUTH] Create token',
  props<{ login: string; password: string }>(),
);
