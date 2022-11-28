import { createAction, props } from '@ngrx/store';
import { BoardModel } from '../../../shared/models/board.model';

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

export const allBoardsLoaded = createAction(
  BoardApiActionsList.allBoardsLoaded,
  props<{ boards: BoardModel[] }>(),
);

export const allBoardsError = createAction(
  BoardApiActionsList.allBoardsError,
  props<{ err: Error }>(),
);

export const boardCreated = createAction(
  BoardApiActionsList.boardCreated,
  props<{ board: BoardModel }>(),
);

export const boardCreatedError = createAction(
  BoardApiActionsList.boardCreatedError,
  props<{ err: Error }>(),
);

export const boardLoaded = createAction(
  BoardApiActionsList.boardLoaded,
  props<{ board: BoardModel }>(),
);

export const boardLoadedError = createAction(
  BoardApiActionsList.boardLoadedError,
  props<{ err: Error }>(),
);

export const boardDeleted = createAction(
  BoardApiActionsList.boardDeleted,
  props<{ boardId: string }>(),
);

export const boardDeletedError = createAction(
  BoardApiActionsList.boardDeletedError,
  props<{ err: Error }>(),
);

export const boardUpdated = createAction(
  BoardApiActionsList.boardUpdated,
  props<{ board: BoardModel }>(),
);

export const boardUpdatedError = createAction(
  BoardApiActionsList.boardUpdatedError,
  props<{ err: Error }>(),
);
