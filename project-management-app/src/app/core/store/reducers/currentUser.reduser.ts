import { createReducer, on } from '@ngrx/store';
import { AuthDataModel } from 'src/app/shared/models/user.model';
import { signedInError, signedUpError } from '../actions/auth-api.actions';

import { getDataFromLS, logOut, signIn, signUp } from '../actions/auth.actions';

const initState: AuthDataModel | null = null;

export const currentUserReducer = createReducer(
  <AuthDataModel | null>initState,
  on(getDataFromLS, (): AuthDataModel | null => {
    const login = localStorage.getItem('login');
    if (login !== null) {
      return { login, password: '', name: '' };
    }
    return null;
  }),
  on(signUp, (_state, { newUserData }): AuthDataModel => newUserData),
  on(signIn, (state, { userData }): AuthDataModel => {
    return { ...userData, name: state?.name || '' };
  }),
  on(signedInError, (): null => null),
  on(signedUpError, (): null => null),
  on(logOut, (): null => null),
);
