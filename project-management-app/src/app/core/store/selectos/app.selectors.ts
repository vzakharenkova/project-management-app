import { createSelector } from '@ngrx/store';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';

import { StateModel } from '../state/state.model';

export const selectBoards = (state: StateModel) => state.boards;

export const selectToken = (state: StateModel) => state.token;

export const selectBoardById = (boardId: string) =>
  createSelector(
    selectBoards,
    (boards: BoardModel[]) => <BoardModel>boards.find((board) => board.id === boardId),
  );

export const selectColumns = (boardId: string) =>
  createSelector(selectBoardById(boardId), (board: BoardModel) => <ColumnModel[]>board.columns);

export const selectColumnById = (boardId: string, columnId: string) =>
  createSelector(
    selectColumns(boardId),
    (columns: ColumnModel[]) => <ColumnModel>columns.find((column) => column.id === columnId),
  );
