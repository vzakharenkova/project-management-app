import { createReducer, on } from '@ngrx/store';
import { signedInError } from '../actions/auth-api.actions';

import { getDataFromLS, logOut } from '../actions/auth.actions';

const initState: string | null = null;

export const currentUserReducer = createReducer(
  <string | null>initState,
  on(getDataFromLS, (): string | null => localStorage.getItem('login')),
  on(signedInError, (): null => null),
  on(logOut, (): null => null),
);
