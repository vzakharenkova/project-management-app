import { createReducer, on } from '@ngrx/store';
import {
  allBoardsLoaded,
  boardCreated,
  boardDeleted,
  boardUpdated,
} from '../actions/board-api.actions';
import { BoardModel } from 'src/app/shared/models/board.model';
import { logOut } from '../actions/auth.actions';

const initialState: BoardModel[] = [];

export const boardReducer = createReducer(
  initialState,
  on(logOut, (): BoardModel[] => []),

  on(allBoardsLoaded, (state, { boards }): BoardModel[] => boards),

  on(boardCreated, (state, { board }): BoardModel[] => {
    const boards = [...state];
    boards.push(board);
    return boards;
  }),

  on(boardDeleted, (state, { boardId }): BoardModel[] => {
    return state.filter((board) => board.id !== boardId);
  }),

  on(boardUpdated, (state, { board }): BoardModel[] => {
    const newBoards = state.map((currentBoard) => {
      if (currentBoard.id === board.id) {
        currentBoard = board;
      }
      return currentBoard;
    });

    return newBoards;
  }),
);
