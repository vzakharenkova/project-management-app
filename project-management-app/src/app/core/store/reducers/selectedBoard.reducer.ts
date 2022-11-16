import { createReducer, on } from '@ngrx/store';
import { boardLoaded } from '../actions/board-api.actions';
import { BoardModel } from 'src/app/shared/models/board.model';
import {
  allColumnsLoaded,
  columnCreated,
  columnDeleted,
  columnUpdated,
} from '../actions/column-api.actions';
import { allTasksLoaded, taskCreated, taskDeleted, taskUpdated } from '../actions/task-api.actions';

const initialState: BoardModel | null = null;

export const selectedBoardReducer = createReducer(
  <BoardModel | null>initialState,
  on(boardLoaded, (state, { board }): BoardModel => {
    const columns = board.columns && [...board.columns];
    columns?.sort((col_1, col_2) => col_1.order - col_2.order);
    return { ...board, columns };
  }),

  on(allColumnsLoaded, (state, { columns }): BoardModel | null => {
    if (state !== null) {
      const board = { ...state };
      board.columns = columns;
      return board;
    }
    return state;
  }),

  on(columnCreated, (state, { column }): BoardModel | null => {
    if (state !== null) {
      if (!state.columns) {
        state.columns = [];
      }
      const columns = [...state.columns];
      columns.push(column);

      return { ...state, columns };
    }

    return state;
  }),

  on(columnDeleted, (state, { columnId }): BoardModel | null => {
    if (state !== null) {
      const columns = state.columns!.filter((column) => column.id !== columnId);

      return { ...state, columns };
    }

    return state;
  }),

  on(columnUpdated, (state, { column }): BoardModel | null => {
    if (state !== null) {
      const columns = state.columns!.map((currentColumn) => {
        if (currentColumn.id === column.id) {
          currentColumn = column;
        }
        return currentColumn;
      });
      columns?.sort((col_1, col_2) => col_1.order - col_2.order);
      return { ...state, columns };
    }

    return state;
  }),

  on(allTasksLoaded, (state, { tasks, columnId }): BoardModel | null => {
    if (state !== null) {
      const board: BoardModel = JSON.parse(JSON.stringify(state));
      const currentColumn = board.columns!.find((column) => column.id === columnId)!;
      currentColumn.tasks = tasks;
      currentColumn.tasks.sort((task_1, task_2) => task_1.order - task_2.order);

      return board;
    }

    return state;
  }),

  on(taskCreated, (state, { task, columnId }): BoardModel | null => {
    if (state !== null) {
      const board: BoardModel = JSON.parse(JSON.stringify(state));
      const currentColumn = board.columns!.find((column) => column.id === columnId)!;

      if (!currentColumn.tasks) {
        currentColumn.tasks = [];
      }
      currentColumn.tasks.push(task);

      return board;
    }

    return state;
  }),

  on(taskDeleted, (state, { columnId, taskId }): BoardModel | null => {
    if (state !== null) {
      const board: BoardModel = JSON.parse(JSON.stringify(state));

      const currentColumn = board.columns!.find((column) => column.id === columnId)!;

      const tasks = currentColumn.tasks!.filter((task) => task.id !== taskId);

      currentColumn.tasks = tasks;

      return board;
    }

    return state;
  }),

  on(taskUpdated, (state, { task, columnId }): BoardModel | null => {
    if (state !== null) {
      const board: BoardModel = JSON.parse(JSON.stringify(state));

      const currentColumn = board.columns!.find((column) => column.id === columnId)!;

      currentColumn.tasks = currentColumn.tasks!.map((currentTask) => {
        if (currentTask.id === task.id) {
          currentTask = task;
        }
        return currentTask;
      });

      return board;
    }

    return state;
  }),
);
