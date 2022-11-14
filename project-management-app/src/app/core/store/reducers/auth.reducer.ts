import { createReducer, on } from '@ngrx/store';

import { getDataFromLS, logOut } from '../actions/auth.actions';

const tokenInitState: string | null = null;

export const authReducer = createReducer(
  <string | null>tokenInitState,
  on(getDataFromLS, (): string | null => localStorage.getItem('token')),
  on(logOut, (): null => null),
);
