import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TaskService } from '../../services/task.service';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../actions/task.actions';

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

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  getAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllTasks),
      switchMap((action) =>
        this.taskService.getAllTasks(action.boardId, action.columnId).pipe(
          map((tasks) => ({ type: TaskApiActionsList.allTasksLoaded, tasks })),
          catchError((err) => of({ type: TaskApiActionsList.allTasksError, err })),
        ),
      ),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      switchMap((action) =>
        this.taskService.createTask(action.boardId, action.columnId, action.data).pipe(
          map((task) => ({ type: TaskApiActionsList.taskCreated, task })),
          catchError((err) => of({ type: TaskApiActionsList.taskCreatedError, payload: err })),
        ),
      ),
    );
  });

  getTaskById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTaskById),
      switchMap((action) =>
        this.taskService.getTaskById(action.boardId, action.columnId, action.taskId).pipe(
          map((task) => ({ type: TaskApiActionsList.taskLoaded, task })),
          catchError((err) => of({ type: TaskApiActionsList.taskLoadedError, payload: err })),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) =>
        this.taskService.deleteTask(action.boardId, action.columnId, action.taskId).pipe(
          map(() => ({ type: TaskApiActionsList.taskDeleted })),
          catchError((err) => of({ type: TaskApiActionsList.taskDeletedError, payload: err })),
        ),
      ),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap((action) =>
        this.taskService
          .updateTask(action.boardId, action.columnId, action.taskId, action.data)
          .pipe(
            map((task) => ({ type: TaskApiActionsList.taskUpdated, task })),
            catchError((err) => of({ type: TaskApiActionsList.taskUpdatedError, payload: err })),
          ),
      ),
    );
  });
}
