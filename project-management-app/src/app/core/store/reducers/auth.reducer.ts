import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import { signedIn, signedUp } from '../actions/auth-api.actions';
import { StateModel } from '../state/state.model';

export const authReducer = createReducer(
  initialState,
  on(signedIn, (state, { tokenObj }): StateModel => ({ ...state, token: tokenObj.token })),

  on(signedUp, (state, { user }): StateModel => {
    state.users.push(user);
    return { ...state };
  }),
);
