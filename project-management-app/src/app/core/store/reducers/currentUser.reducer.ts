import { createReducer, on } from '@ngrx/store';
import { SelectedUserModel } from 'src/app/shared/models/user.model';
import { signedInError, signedUpError } from '../actions/auth-api.actions';

import { getDataFromLS, logOut, signIn, signUp } from '../actions/auth.actions';
import { allUsersLoaded, userDeleted, userUpdated } from '../actions/user-api.actions';

const initState: SelectedUserModel | null = null;

export const currentUserReducer = createReducer(
  <SelectedUserModel | null>initState,
  on(getDataFromLS, (state): SelectedUserModel | null => {
    const login = localStorage.getItem('login');
    if (login !== null) {
      return {
        login,
        password: state?.password || '',
        name: state?.name || '',
        id: state?.id || '',
      };
    }
    return null;
  }),

  on(signUp, (state, { newUserData }): SelectedUserModel => {
    return { ...newUserData, id: state?.id || '' };
  }),

  on(signIn, (state, { userData }): SelectedUserModel => {
    return { ...userData, name: state?.name || '', id: state?.id || '' };
  }),

  on(signedInError, (): null => null),

  on(signedUpError, (): null => null),

  on(logOut, (): null => null),

  on(allUsersLoaded, (state, { users }): SelectedUserModel => {
    const currentUser = users.find((user) => user.login === state?.login);
    return { ...(<SelectedUserModel>state), ...currentUser };
  }),

  on(userUpdated, (_state, { user }): SelectedUserModel => {
    return { ...user, password: '' };
  }),

  on(userDeleted, (): null => null),
);
