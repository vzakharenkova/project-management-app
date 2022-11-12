import { createReducer, on } from '@ngrx/store';

import { signedIn } from '../actions/auth-api.actions';

const tokenInitState: string | null = null;

export const authReducer = createReducer(
  <string | null>tokenInitState,
  on(signedIn, (_state, { tokenObj }): string => tokenObj.token),
);

// export const authReducer = createReducer(
//   initialState,
//   on(signedIn, (state, { tokenObj }): StateModel => ({ ...state, token: tokenObj.token })),

//   on(signedUp, (state, { user }): StateModel => {
//     const users = [...state.users];
//     users.push(user);
//     return { ...state, users };
//   }),
// );
