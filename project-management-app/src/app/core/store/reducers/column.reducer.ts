import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import {
  allColumnsLoaded,
  columnCreated,
  columnDeleted,
  columnUpdated,
} from '../actions/column-api.actions';
import { StateModel } from '../state/state.model';

export const columnReducer = createReducer(
  initialState,
  on(allColumnsLoaded, (state, { columns, boardId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    currentBoard.columns = columns;

    return { ...state };
  }),

  on(columnCreated, (state, { column, boardId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;

    if (!currentBoard.columns) {
      currentBoard.columns = [];
    }
    currentBoard.columns.push(column);

    return { ...state };
  }),

  on(columnDeleted, (state, { boardId, columnId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    currentBoard.columns!.filter((column) => column.id === columnId);

    return { ...state };
  }),

  on(columnUpdated, (state, { column, boardId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    currentBoard.columns = currentBoard.columns!.map((currentColumn) => {
      if (currentColumn.id === column.id) {
        currentColumn = column;
      }
      return currentColumn;
    });

    return { ...state };
  }),
);
