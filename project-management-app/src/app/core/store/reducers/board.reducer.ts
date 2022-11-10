import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import {
  allBoardsLoaded,
  boardCreated,
  boardDeleted,
  boardUpdated,
} from '../actions/board-api.actions';
import { StateModel } from '../state/state.model';

export const boardReducer = createReducer(
  initialState,
  on(allBoardsLoaded, (state, { boards }): StateModel => ({ ...state, boards })),

  on(boardCreated, (state, { board }): StateModel => {
    state.boards.push(board);
    return { ...state };
  }),

  on(boardDeleted, (state, { boardId }): StateModel => {
    state.boards.filter((board) => board.id === boardId);
    return { ...state };
  }),

  on(boardUpdated, (state, { board }): StateModel => {
    const newBoards = state.boards.map((currentBoard) => {
      if (currentBoard.id === board.id) {
        currentBoard = board;
      }
      return currentBoard;
    });

    return { ...state, boards: newBoards };
  }),
);
