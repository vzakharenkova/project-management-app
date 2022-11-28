import { createAction, props } from '@ngrx/store';

import { AuthDataModel } from '../../../shared/models/user.model';

export enum UserActionsList {
  getAll = '[USER] Get all users',
  getById = '[USER] Get one user',
  delete = '[USER] Delete user',
  update = '[USER] Update user',
}

export const getAllUsers = createAction(UserActionsList.getAll);

export const getUserById = createAction(UserActionsList.getById, props<{ userId: string }>());

export const deleteUser = createAction(UserActionsList.delete, props<{ userId: string }>());

export const updateUser = createAction(
  UserActionsList.update,
  props<{ userId: string; data: AuthDataModel }>(),
);
