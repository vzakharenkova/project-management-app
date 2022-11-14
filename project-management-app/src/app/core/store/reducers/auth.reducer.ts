import { createReducer, on } from '@ngrx/store';
import { signedIn } from '../actions/auth-api.actions';

import { getDataFromLS, logOut } from '../actions/auth.actions';

const tokenInitState: string | null = null;

export const authReducer = createReducer(
  <string | null>tokenInitState,
  on(getDataFromLS, (): string | null => localStorage.getItem('token')),
  on(signedIn, (_state, { tokenObj }): string => tokenObj.token),
  on(logOut, (): null => null),
);
