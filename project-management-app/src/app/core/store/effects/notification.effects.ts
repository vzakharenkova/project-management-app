import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import {
  allBoardsError,
  boardCreated,
  boardCreatedError,
  boardDeleted,
  boardDeletedError,
  boardLoadedError,
  boardUpdated,
  boardUpdatedError,
} from '../actions/board-api.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  notificationConfigBasic,
  notificationConfigErr,
} from 'src/app/shared/utils/noticationConfig';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthApiActionsList } from '../actions/auth-api.actions';
import {
  allColumnsError,
  columnCreated,
  columnCreatedError,
  columnDeleted,
  columnDeletedError,
  columnUpdated,
  columnUpdatedError,
} from '../actions/column-api.actions';
import {
  allTasksError,
  taskCreated,
  taskCreatedError,
  taskDeleted,
  taskDeletedError,
  taskUpdated,
  taskUpdatedError,
} from '../actions/task-api.actions';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, private _notification: MatSnackBar) {}

  signUpError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedUpError),
        tap((action: { err: HttpErrorResponse; type: AuthApiActionsList.signedUpError }) => {
          if (action.err.error.statusCode === 409) {
            this._notification.open(
              'User login already exists. Please change login and try again',
              '',
              notificationConfigErr,
            );
          } else {
            this._notification.open(
              'Something goes wrong. Please try again',
              '',
              notificationConfigErr,
            );
          }
        }),
      );
    },
    { dispatch: false },
  );

  signInError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedInError),
        tap((action: { err: HttpErrorResponse; type: AuthApiActionsList.signedInError }) => {
          if (action.err.error.statusCode === 403) {
            this._notification.open(
              'This user does not exist. Please sing up',
              '',
              notificationConfigErr,
            );
          } else {
            this._notification.open(
              'Something goes wrong. Please try again',
              '',
              notificationConfigErr,
            );
          }
        }),
      );
    },
    { dispatch: false },
  );

  itemCreated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(boardCreated, columnCreated, taskCreated),
        tap(() => {
          this._notification.open('Created', '', notificationConfigBasic);
        }),
      );
    },
    { dispatch: false },
  );

  itemDeleted$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(boardDeleted, columnDeleted, taskDeleted),
        tap(() => {
          this._notification.open('Deleted', '', notificationConfigBasic);
        }),
      );
    },
    { dispatch: false },
  );

  itemUpdated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(boardUpdated, columnUpdated, taskUpdated),
        tap(() => {
          this._notification.open('Updated', '', notificationConfigBasic);
        }),
      );
    },
    { dispatch: false },
  );

  itemActionErorr$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          boardCreatedError,
          boardDeletedError,
          boardLoadedError,
          boardUpdatedError,
          allBoardsError,
          columnCreatedError,
          columnDeletedError,
          columnUpdatedError,
          allColumnsError,
          taskCreatedError,
          taskDeletedError,
          taskUpdatedError,
          allTasksError,
        ),
        tap(() => {
          this._notification.open(
            'Something is wrong. Please try again',
            '',
            notificationConfigErr,
          );
        }),
      );
    },
    { dispatch: false },
  );
}
