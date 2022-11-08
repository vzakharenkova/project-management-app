import { createAction, props } from '@ngrx/store';

export enum BoardActionsList {
  getAll = '[BOARD] Get all boards',
  create = '[BOARD] Create new board',
  getById = '[BOARD] Get one board',
  delete = '[BOARD] Delete board',
  update = '[BOARD] Update board',
}

export const getAllBoards = createAction(BoardActionsList.getAll);

export const createBoard = createAction(
  BoardActionsList.create,
  props<{ title: string; description: string }>(),
);

export const getBoardById = createAction(BoardActionsList.getById, props<{ boardId: string }>());

export const deleteBoard = createAction(BoardActionsList.delete, props<{ boardId: string }>());

export const updateBoard = createAction(
  BoardActionsList.update,
  props<{ boardId: string; data: { title: string; description: string } }>(),
);
