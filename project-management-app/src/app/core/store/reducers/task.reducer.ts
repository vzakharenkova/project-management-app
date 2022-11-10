import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import { allTasksLoaded, taskCreated, taskDeleted, taskUpdated } from '../actions/task-api.actions';
import { StateModel } from '../state/state.model';

export const taskReducer = createReducer(
  initialState,
  on(allTasksLoaded, (state, { tasks, boardId, columnId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;
    currentColumn.tasks = tasks;

    return { ...state };
  }),

  on(taskCreated, (state, { task, boardId, columnId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    if (!currentColumn.tasks) {
      currentColumn.tasks = [];
    }
    currentColumn.tasks.push(task);

    return { ...state };
  }),

  on(taskDeleted, (state, { boardId, columnId, taskId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    currentColumn.tasks!.filter((task) => task.id === taskId);

    return { ...state };
  }),

  on(taskUpdated, (state, { task, boardId, columnId }): StateModel => {
    const currentBoard = state.boards.find((board) => board.id === boardId)!;
    const currentColumn = currentBoard.columns!.find((column) => column.id === columnId)!;

    currentColumn.tasks = currentColumn.tasks!.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask = task;
      }
      return currentTask;
    });

    return { ...state };
  }),
);
