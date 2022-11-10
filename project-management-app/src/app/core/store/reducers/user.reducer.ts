import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import { allUsersLoaded, userDeleted, userUpdated } from '../actions/user-api.actions';
import { StateModel } from '../state/state.model';

export const userReducer = createReducer(
  initialState,
  on(allUsersLoaded, (state, { users }): StateModel => ({ ...state, users })),

  on(
    userDeleted,
    (state, { userId }): StateModel => ({
      ...state,
      users: state.users.filter((user) => user.id === userId),
    }),
  ),

  on(userUpdated, (state, { user }): StateModel => {
    const newUsers = state.users.map((currentUser) => {
      if (currentUser.id === user.id) {
        currentUser = user;
      }
      return currentUser;
    });

    return { ...state, users: newUsers };
  }),
);
