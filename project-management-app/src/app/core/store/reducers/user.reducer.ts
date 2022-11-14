import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models/user.model';
import { signedUp } from '../actions/auth-api.actions';

import { allUsersLoaded, userDeleted, userUpdated } from '../actions/user-api.actions';

const initialState: UserModel[] = [];

export const userReducer = createReducer(
  initialState,
  on(allUsersLoaded, (state, { users }): UserModel[] => users),

  on(userDeleted, (state, { userId }): UserModel[] => {
    return state.filter((user) => user.id === userId);
  }),

  on(userUpdated, (state, { user }): UserModel[] => {
    return state.map((currentUser) => {
      if (currentUser.id === user.id) {
        currentUser = user;
      }
      return currentUser;
    });
  }),

  on(signedUp, (state, { user }): UserModel[] => {
    const users = [...state];
    users.push(user);
    return users;
  }),
);
