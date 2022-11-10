import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../../shared/models/user.model';

export enum UserApiActionsList {
  allUsersLoaded = '[USER API] All users loaded success',
  allUsersError = '[USER API] All users loaded error',
  userLoaded = '[USER API] Single user loaded success',
  userLoadedError = '[USER API] Single user loaded error',
  userDeleted = '[USER API]  User deleted success',
  userDeletedError = '[USER API] User deleted error',
  userUpdated = '[USER API] User updated success',
  userUpdatedError = '[USER API] User updated error',
}

export const allUsersLoaded = createAction(
  UserApiActionsList.allUsersLoaded,
  props<{ users: UserModel[] }>(),
);

export const allUsersError = createAction(
  UserApiActionsList.allUsersError,
  props<{ err: Error }>(),
);

export const userLoaded = createAction(UserApiActionsList.userLoaded, props<{ user: UserModel }>());

export const userLoadedError = createAction(
  UserApiActionsList.userLoadedError,
  props<{ err: Error }>(),
);

export const userDeleted = createAction(UserApiActionsList.userDeleted);

export const userDeletedError = createAction(
  UserApiActionsList.userDeletedError,
  props<{ err: Error }>(),
);

export const userUpdated = createAction(
  UserApiActionsList.userUpdated,
  props<{ user: UserModel }>(),
);

export const userUpdatedError = createAction(
  UserApiActionsList.userUpdatedError,
  props<{ err: Error }>(),
);
