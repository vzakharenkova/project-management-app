import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { UserService } from '../../services/user.service';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../actions/user.actions';

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

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => ({ type: UserApiActionsList.allUsersLoaded, users })),
          catchError((err) => of({ type: UserApiActionsList.allUsersError, err })),
        ),
      ),
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserById),
      switchMap((action) =>
        this.userService.getUserById(action.userId).pipe(
          map((user) => ({ type: UserApiActionsList.userLoaded, user })),
          catchError((err) => of({ type: UserApiActionsList.userLoadedError, payload: err })),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => ({ type: UserApiActionsList.userDeleted })),
          catchError((err) => of({ type: UserApiActionsList.userDeletedError, payload: err })),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.userId, action.data).pipe(
          map((user) => ({ type: UserApiActionsList.userUpdated, user })),
          catchError((err) => of({ type: UserApiActionsList.userUpdatedError, payload: err })),
        ),
      ),
    );
  });
}
