import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
} from '../actions/column.actions';

export enum ColumnApiActionsList {
  allColumnsLoaded = '[COLUMN API] All columns loaded success',
  allColumnsError = '[COLUMN API] All columns loaded error',
  columnCreated = '[COLUMN API] New column created success',
  columnCreatedError = '[COLUMN API] New column created error',
  columnLoaded = '[COLUMN API] Single column loaded success',
  columnLoadedError = '[COLUMN API] Single column loaded error',
  columnDeleted = '[COLUMN API]  Column deleted success',
  columnDeletedError = '[COLUMN API] Column deleted error',
  columnUpdated = '[COLUMN API] Column updated success',
  columnUpdatedError = '[COLUMN API] Column updated error',
}

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnService: ColumnService) {}

  getAllColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllColumns),
      switchMap((action) =>
        this.columnService.getAllColumns(action.boardId).pipe(
          map((columns) => ({ type: ColumnApiActionsList.allColumnsLoaded, columns })),
          catchError((err) => of({ type: ColumnApiActionsList.allColumnsError, err })),
        ),
      ),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createColumn),
      switchMap((action) =>
        this.columnService.createColumn(action.boardId, action.data).pipe(
          map((column) => ({ type: ColumnApiActionsList.columnCreated, column })),
          catchError((err) => of({ type: ColumnApiActionsList.columnCreatedError, payload: err })),
        ),
      ),
    );
  });

  getColumnById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getColumnById),
      switchMap((action) =>
        this.columnService.getColumnById(action.boardId, action.columnId).pipe(
          map((column) => ({ type: ColumnApiActionsList.columnLoaded, column })),
          catchError((err) => of({ type: ColumnApiActionsList.columnLoadedError, payload: err })),
        ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteColumn),
      switchMap((action) =>
        this.columnService.deleteColumn(action.boardId, action.columnId).pipe(
          map(() => ({ type: ColumnApiActionsList.columnDeleted })),
          catchError((err) => of({ type: ColumnApiActionsList.columnDeletedError, payload: err })),
        ),
      ),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateColumn),
      switchMap((action) =>
        this.columnService.updateColumn(action.boardId, action.columnId, action.data).pipe(
          map((column) => ({ type: ColumnApiActionsList.columnUpdated, column })),
          catchError((err) => of({ type: ColumnApiActionsList.columnUpdatedError, payload: err })),
        ),
      ),
    );
  });
}
