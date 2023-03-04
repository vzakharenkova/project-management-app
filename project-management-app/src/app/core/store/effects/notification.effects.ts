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
import { userDeletedError, userUpdated, userUpdatedError } from '../actions/user-api.actions';
import { Router } from '@angular/router';
import { fileDownloadError } from '../actions/file-api.actions';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private _notification: MatSnackBar,
    private router: Router,
    private transloco: TranslocoService,
  ) {}

  signUpError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActionsList.signedUpError),
        tap((action: { err: HttpErrorResponse; type: AuthApiActionsList.signedUpError }) => {
          if (action.err.error.statusCode === 409) {
            const msg = this.transloco.translateObject('notifications.userExist');
            this._notification.open(msg, '', notificationConfigErr);
          } else {
            const msg = this.transloco.translateObject('notifications.smthWrong');
            this._notification.open(msg, '', notificationConfigErr);
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
            const msg = this.transloco.translateObject('notifications.userNotExist');
            this._notification.open(msg, '', notificationConfigErr);
          } else {
            const msg = this.transloco.translateObject('notifications.smthWrong');
            this._notification.open(msg, '', notificationConfigErr);
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
          const msg = this.transloco.translateObject('notifications.created');
          this._notification.open(msg, '', notificationConfigBasic);
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
          const msg = this.transloco.translateObject('notifications.deleted');
          this._notification.open(msg, '', notificationConfigBasic);
        }),
      );
    },
    { dispatch: false },
  );

  itemUpdated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(boardUpdated, columnUpdated, taskUpdated, userUpdated),
        tap(() => {
          const msg = this.transloco.translateObject('notifications.updated');
          this._notification.open(msg, '', notificationConfigBasic);
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
          userUpdatedError,
          userDeletedError,
          fileDownloadError,
        ),
        tap(() => {
          const msg = this.transloco.translateObject('notifications.smthWrong');
          this._notification.open(msg, '', notificationConfigErr);
        }),
      );
    },
    { dispatch: false },
  );

  boardLoadingErorr$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(boardLoadedError),
        tap((action) => {
          if (
            (<HttpErrorResponse>action.err).status === 404 ||
            (<HttpErrorResponse>action.err).status === 400
          ) {
            const msg = this.transloco.translateObject('notifications.boardNotExist');
            this._notification.open(msg, '', notificationConfigErr);
            this.router.navigateByUrl('/boards');
          } else {
            const msg = this.transloco.translateObject('notifications.smthWrong');
            this._notification.open(msg, '', notificationConfigErr);
          }
        }),
      );
    },
    { dispatch: false },
  );
}
