import { createReducer, on } from '@ngrx/store';
import {
  allBoardsLoaded,
  boardCreated,
  boardDeleted,
  boardUpdated,
} from '../actions/board-api.actions';
import { BoardModel } from 'src/app/shared/models/board.model';
import {
  allColumnsLoaded,
  columnCreated,
  columnDeleted,
  columnUpdated,
} from '../actions/column-api.actions';
import { allTasksLoaded, taskCreated, taskDeleted, taskUpdated } from '../actions/task-api.actions';

const initialState: BoardModel[] = [];

export const boardReducer = createReducer(
  initialState,
  on(allBoardsLoaded, (state, { boards }): BoardModel[] => boards),

  on(boardCreated, (state, { board }): BoardModel[] => {
    const boards = [...state];
    boards.push(board);
    return boards;
  }),

  on(boardDeleted, (state, { boardId }): BoardModel[] => {
    state.filter((board) => board.id === boardId);
    return state;
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

  on(allColumnsLoaded, (state, { columns, boardId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    currentBoard.columns = columns;

    return state;
  }),

  on(columnCreated, (state, { column, boardId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;

    if (!currentBoard.columns) {
      currentBoard.columns = [];
    }
    currentBoard.columns.push(column);

    return state;
  }),

  on(columnDeleted, (state, { boardId, columnId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    currentBoard.columns!.filter((column) => column.id === columnId);

    return state;
  }),

  on(columnUpdated, (state, { column, boardId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    currentBoard.columns = currentBoard.columns!.map((currentColumn) => {
      if (currentColumn.id === column.id) {
        currentColumn = column;
      }
      return currentColumn;
    });

    return state;
  }),

  on(allTasksLoaded, (state, { tasks, boardId, columnId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;
    currentColumn.tasks = tasks;

    return state;
  }),

  on(taskCreated, (state, { task, boardId, columnId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    if (!currentColumn.tasks) {
      currentColumn.tasks = [];
    }
    currentColumn.tasks.push(task);

    return state;
  }),

  on(taskDeleted, (state, { boardId, columnId, taskId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    currentColumn.tasks!.filter((task) => task.id === taskId);

    return state;
  }),

  on(taskUpdated, (state, { task, boardId, columnId }): BoardModel[] => {
    const currentBoard = state.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    currentColumn.tasks = currentColumn.tasks!.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask = task;
      }
      return currentTask;
    });

    return state;
  }),
);
