import { createAction, props } from '@ngrx/store';
import { TaskModel } from '../../../shared/models/task.model';

export enum TaskActionsList {
  getAll = '[TASK] Get all tasks',
  create = '[TASK] Create new task',
  getById = '[TASK] Get one task',
  delete = '[TASK] Delete task',
  update = '[TASK] Update task',
}

export const getAllTasks = createAction(
  TaskActionsList.getAll,
  props<{ boardId: string; columnId: string }>(),
);

export const createTask = createAction(
  TaskActionsList.create,
  props<{
    boardId: string;
    columnId: string;
    data: { title: string; description: string; userId: string };
  }>(),
);

export const getTaskById = createAction(
  TaskActionsList.getById,
  props<{ boardId: string; columnId: string; taskId: string }>(),
);

export const deleteTask = createAction(
  TaskActionsList.delete,
  props<{ boardId: string; columnId: string; taskId: string }>(),
);

export const updateTask = createAction(
  TaskActionsList.update,
  props<{ boardId: string; columnId: string; taskId: string; data: Omit<TaskModel, 'id'> }>(),
);
