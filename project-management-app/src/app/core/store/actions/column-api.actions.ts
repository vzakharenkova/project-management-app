import { createAction, props } from '@ngrx/store';
import { ColumnModel } from '../../../shared/models/column.model';

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

export const allColumnsLoaded = createAction(
  ColumnApiActionsList.allColumnsLoaded,
  props<{ columns: ColumnModel[] }>(),
);

export const allColumnsError = createAction(
  ColumnApiActionsList.allColumnsError,
  props<{ err: Error }>(),
);

export const columnCreated = createAction(
  ColumnApiActionsList.columnCreated,
  props<{ column: ColumnModel }>(),
);

export const columnCreatedError = createAction(
  ColumnApiActionsList.columnCreatedError,
  props<{ err: Error }>(),
);

export const columnLoaded = createAction(
  ColumnApiActionsList.columnLoaded,
  props<{ column: ColumnModel }>(),
);

export const columnLoadedError = createAction(
  ColumnApiActionsList.columnLoadedError,
  props<{ err: Error }>(),
);

export const columnDeleted = createAction(ColumnApiActionsList.columnDeleted);

export const columnDeletedError = createAction(
  ColumnApiActionsList.columnDeletedError,
  props<{ err: Error }>(),
);

export const columnUpdated = createAction(
  ColumnApiActionsList.columnUpdated,
  props<{ column: ColumnModel }>(),
);

export const columnUpdatedError = createAction(
  ColumnApiActionsList.columnUpdatedError,
  props<{ err: Error }>(),
);
