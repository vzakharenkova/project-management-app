import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { BoardService } from '../../services/board.service';
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from '../actions/board.actions';
import {
  allBoardsError,
  allBoardsLoaded,
  boardCreated,
  boardCreatedError,
  boardDeleted,
  boardDeletedError,
  boardLoaded,
  boardLoadedError,
  boardUpdated,
  boardUpdatedError,
} from '../actions/board-api.actions';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {}

  getAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllBoards),
      mergeMap(() =>
        this.boardService.getAllBoards().pipe(
          map((boards) => allBoardsLoaded({ boards })),
          catchError((err) => of(allBoardsError({ err }))),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBoard),
      switchMap((action) =>
        this.boardService.createBoard(action.data).pipe(
          map((board) => boardCreated({ board })),
          catchError((err) => of(boardCreatedError({ err }))),
        ),
      ),
    );
  });

  getBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBoardById),
      switchMap((action) =>
        this.boardService.getBoardById(action.boardId).pipe(
          map((board) => boardLoaded({ board })),
          catchError((err) => of(boardLoadedError({ err }))),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoard),
      switchMap((action) =>
        this.boardService.deleteBoard(action.boardId).pipe(
          map(() => boardDeleted()),
          catchError((err) => of(boardDeletedError({ err }))),
        ),
      ),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBoard),
      switchMap((action) =>
        this.boardService.updateBoard(action.boardId, action.data).pipe(
          map((board) => boardUpdated({ board })),
          catchError((err) => of(boardUpdatedError({ err }))),
        ),
      ),
    );
  });
}
