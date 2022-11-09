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

export enum BoardApiActionsList {
  allBoardsLoaded = '[BOARD API] All boards loaded success',
  allBoardsError = '[BOARD API] All boards loaded error',
  boardCreated = '[BOARD API] New board created success',
  boardCreatedError = '[BOARD API] New board created error',
  boardLoaded = '[BOARD API] Single board loaded success',
  boardLoadedError = '[BOARD API] Single board loaded error',
  boardDeleted = '[BOARD API]  Board deleted success',
  boardDeletedError = '[BOARD API] Board deleted error',
  boardUpdated = '[BOARD API] Board updated success',
  boardUpdatedError = '[BOARD API] Board updated error',
}

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {}

  getAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllBoards),
      mergeMap(() =>
        this.boardService.getAllBoards().pipe(
          map((boards) => ({ type: BoardApiActionsList.allBoardsLoaded, boards })),
          catchError((err) => of({ type: BoardApiActionsList.allBoardsError, err })),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBoard),
      switchMap((action) =>
        this.boardService.createBoard(action.data).pipe(
          map((board) => ({ type: BoardApiActionsList.boardCreated, board })),
          catchError((err) => of({ type: BoardApiActionsList.boardCreatedError, err })),
        ),
      ),
    );
  });

  getBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBoardById),
      switchMap((action) =>
        this.boardService.getBoardById(action.boardId).pipe(
          map((board) => ({ type: BoardApiActionsList.boardLoaded, board })),
          catchError((err) => of({ type: BoardApiActionsList.boardLoadedError, err })),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoard),
      switchMap((action) =>
        this.boardService.deleteBoard(action.boardId).pipe(
          map(() => ({ type: BoardApiActionsList.boardDeleted })),
          catchError((err) => of({ type: BoardApiActionsList.boardDeletedError, err })),
        ),
      ),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBoard),
      switchMap((action) =>
        this.boardService.updateBoard(action.boardId, action.data).pipe(
          map((board) => ({ type: BoardApiActionsList.boardUpdated, board })),
          catchError((err) => of({ type: BoardApiActionsList.boardUpdatedError, err })),
        ),
      ),
    );
  });
}
