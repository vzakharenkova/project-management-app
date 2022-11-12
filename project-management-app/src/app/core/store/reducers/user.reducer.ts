import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models/user.model';
import { signedUp } from '../actions/auth-api.actions';

import { allUsersLoaded, userDeleted, userUpdated } from '../actions/user-api.actions';

const initialState: UserModel[] = [];

export const userReducer = createReducer(
  initialState,
  on(allUsersLoaded, (state, { users }): UserModel[] => ({ ...state, ...users })),

  on(userDeleted, (state, { userId }): UserModel[] => {
    state.filter((user) => user.id === userId);
    return { ...state };
  }),

  on(userUpdated, (state, { user }): UserModel[] => {
    const newUsers = state.map((currentUser) => {
      if (currentUser.id === user.id) {
        currentUser = user;
      }
      return currentUser;
    });

    return { ...newUsers };
  }),

  on(signedUp, (state, { user }): UserModel[] => {
    const users = [...state];
    users.push(user);
    return { ...users };
  }),
);
