import { createAction, props } from '@ngrx/store';

export enum ColumnActionsList {
  getAll = '[COLUMN] Get all columns',
  create = '[COLUMN] Create new column',
  getById = '[COLUMN] Get one column',
  delete = '[COLUMN] Delete column',
  update = '[COLUMN] Update column',
}

export const getAllColumns = createAction(ColumnActionsList.getAll, props<{ boardId: string }>());

export const createColumn = createAction(
  ColumnActionsList.create,
  props<{ boardId: string; data: { title: string } }>(),
);

export const getColumnById = createAction(
  ColumnActionsList.getById,
  props<{ boardId: string; columnId: string }>(),
);

export const deleteColumn = createAction(
  ColumnActionsList.delete,
  props<{ boardId: string; columnId: string }>(),
);

export const updateColumn = createAction(
  ColumnActionsList.update,
  props<{ boardId: string; columnId: string; data: { title: string; order: number } }>(),
);
