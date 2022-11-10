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
import {
  allTasksError,
  allTasksLoaded,
  taskCreated,
  taskCreatedError,
  taskDeleted,
  taskDeletedError,
  taskLoaded,
  taskLoadedError,
  taskUpdated,
  taskUpdatedError,
} from '../actions/task-api.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  getAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllTasks),
      switchMap((action) =>
        this.taskService.getAllTasks(action.boardId, action.columnId).pipe(
          map((tasks) =>
            allTasksLoaded({ tasks, boardId: action.boardId, columnId: action.columnId }),
          ),
          catchError((err) => of(allTasksError({ err }))),
        ),
      ),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      switchMap((action) =>
        this.taskService.createTask(action.boardId, action.columnId, action.data).pipe(
          map((task) => taskCreated({ task, boardId: action.boardId, columnId: action.columnId })),
          catchError((err) => of(taskCreatedError({ err }))),
        ),
      ),
    );
  });

  getTaskById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTaskById),
      switchMap((action) =>
        this.taskService.getTaskById(action.boardId, action.columnId, action.taskId).pipe(
          map((task) => taskLoaded({ task, boardId: action.boardId, columnId: action.columnId })),
          catchError((err) => of(taskLoadedError({ err }))),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) =>
        this.taskService.deleteTask(action.boardId, action.columnId, action.taskId).pipe(
          map(() =>
            taskDeleted({
              boardId: action.boardId,
              columnId: action.columnId,
              taskId: action.taskId,
            }),
          ),
          catchError((err) => of(taskDeletedError({ err }))),
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
            map((task) =>
              taskUpdated({ task, boardId: action.boardId, columnId: action.columnId }),
            ),
            catchError((err) => of(taskUpdatedError({ err }))),
          ),
      ),
    );
  });
}
