import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { UserService } from '../../services/user.service';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../actions/user.actions';
import {
  allUsersError,
  allUsersLoaded,
  userDeleted,
  userDeletedError,
  userLoaded,
  userLoadedError,
  userUpdated,
  userUpdatedError,
} from '../actions/user-api.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {}

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map(
            (users) => allUsersLoaded({ users }),
            catchError((err: Error) => of(allUsersError({ err }))),
          ),
        ),
      ),
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserById),
      switchMap((action) =>
        this.userService.getUserById(action.userId).pipe(
          map((user) => userLoaded({ user })),
          catchError((err) => of(userLoadedError({ err }))),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => userDeleted({ userId: action.userId })),
          catchError((err) => of(userDeletedError({ err }))),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.userId, action.data).pipe(
          map((user) => userUpdated({ user })),
          catchError((err) => of(userUpdatedError({ err }))),
        ),
      ),
    );
  });

  updatedUserRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(userUpdated),
        tap((action) => {
          this.router.navigateByUrl('/boards');
          localStorage.setItem('login', action.user.login);
        }),
      );
    },
    { dispatch: false },
  );

  deletedUserRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(userDeleted),
        tap(() => {
          this.router.navigateByUrl('/welcome');
          localStorage.removeItem('login');
          localStorage.removeItem('token');
        }),
      );
    },
    { dispatch: false },
  );
}
