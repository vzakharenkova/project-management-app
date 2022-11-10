import { createAction, props } from '@ngrx/store';
import { TaskModel } from '../../../shared/models/task.model';

export enum TaskApiActionsList {
  allTasksLoaded = '[TASK API] All tasks loaded success',
  allTasksError = '[TASK API] All tasks loaded error',
  taskCreated = '[TASK API] New task created success',
  taskCreatedError = '[TASK API] New task created error',
  taskLoaded = '[TASK API] Single task loaded success',
  taskLoadedError = '[TASK API] Single task loaded error',
  taskDeleted = '[TASK API]  Task deleted success',
  taskDeletedError = '[TASK API] Task deleted error',
  taskUpdated = '[TASK API] Task updated success',
  taskUpdatedError = '[TASK API] Task updated error',
}

export const allTasksLoaded = createAction(
  TaskApiActionsList.allTasksLoaded,
  props<{ tasks: TaskModel[]; boardId: string; columnId: string }>(),
);

export const allTasksError = createAction(
  TaskApiActionsList.allTasksError,
  props<{ err: Error }>(),
);

export const taskCreated = createAction(
  TaskApiActionsList.taskCreated,
  props<{ task: TaskModel; boardId: string; columnId: string }>(),
);

export const taskCreatedError = createAction(
  TaskApiActionsList.taskCreatedError,
  props<{ err: Error }>(),
);

export const taskLoaded = createAction(
  TaskApiActionsList.taskLoaded,
  props<{ task: TaskModel; boardId: string; columnId: string }>(),
);

export const taskLoadedError = createAction(
  TaskApiActionsList.taskLoadedError,
  props<{ err: Error }>(),
);

export const taskDeleted = createAction(
  TaskApiActionsList.taskDeleted,
  props<{ boardId: string; columnId: string; taskId: string }>(),
);

export const taskDeletedError = createAction(
  TaskApiActionsList.taskDeletedError,
  props<{ err: Error }>(),
);

export const taskUpdated = createAction(
  TaskApiActionsList.taskUpdated,
  props<{ task: TaskModel; boardId: string; columnId: string }>(),
);

export const taskUpdatedError = createAction(
  TaskApiActionsList.taskUpdatedError,
  props<{ err: Error }>(),
);
