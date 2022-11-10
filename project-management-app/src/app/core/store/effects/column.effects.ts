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
import {
  allColumnsError,
  allColumnsLoaded,
  columnCreated,
  columnCreatedError,
  columnDeleted,
  columnDeletedError,
  columnLoaded,
  columnLoadedError,
  columnUpdated,
  columnUpdatedError,
} from '../actions/column-api.actions';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnService: ColumnService) {}

  getAllColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllColumns),
      switchMap((action) =>
        this.columnService.getAllColumns(action.boardId).pipe(
          map((columns) => allColumnsLoaded({ columns, boardId: action.boardId })),
          catchError((err) => of(allColumnsError({ err }))),
        ),
      ),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createColumn),
      switchMap((action) =>
        this.columnService.createColumn(action.boardId, action.data).pipe(
          map((column) => columnCreated({ column, boardId: action.boardId })),
          catchError((err) => of(columnCreatedError({ err }))),
        ),
      ),
    );
  });

  getColumnById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getColumnById),
      switchMap((action) =>
        this.columnService.getColumnById(action.boardId, action.columnId).pipe(
          map((column) => columnLoaded({ column, boardId: action.boardId })),
          catchError((err) => of(columnLoadedError({ err }))),
        ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteColumn),
      switchMap((action) =>
        this.columnService.deleteColumn(action.boardId, action.columnId).pipe(
          map(() => columnDeleted({ boardId: action.columnId, columnId: action.columnId })),
          catchError((err) => of(columnDeletedError({ err }))),
        ),
      ),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateColumn),
      switchMap((action) =>
        this.columnService.updateColumn(action.boardId, action.columnId, action.data).pipe(
          map((column) => columnUpdated({ column, boardId: action.boardId })),
          catchError((err) => of(columnUpdatedError({ err }))),
        ),
      ),
    );
  });
}
