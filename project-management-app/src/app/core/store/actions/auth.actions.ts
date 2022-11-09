import { createAction, props } from '@ngrx/store';
import { AuthDataModel } from '../../../shared/models/user.model';

export const signUp = createAction(
  '[AUTH] Create new account',
  props<{ newUserData: AuthDataModel }>(),
);

export const signIn = createAction(
  '[AUTH] Create token',
  props<{ userData: Omit<AuthDataModel, 'name'> }>(),
);
