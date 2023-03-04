import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap, take, tap } from 'rxjs';

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
import { getBoardById } from '../actions/board.actions';
import { FileService } from '../../services/file.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private fileService: FileService,
    private store: Store,
  ) {}

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
          map((task) =>
            taskCreated({
              task,
              boardId: action.boardId,
              columnId: action.columnId,
              files: action.files,
            }),
          ),
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
            map((task) => {
              if (!action.files) {
                return getBoardById({ boardId: action.boardId });
              } else {
                return taskUpdated({
                  task,
                  boardId: action.boardId,
                  columnId: action.columnId,
                  files: action.files,
                });
              }
            }),
            catchError((err) => of(taskUpdatedError({ err }))),
          ),
      ),
    );
  });

  taskUpdated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(taskUpdated, taskCreated),
        tap((action) => {
          if (action.files && action.files.length) {
            forkJoin(
              action.files.map((file) => {
                let formData = new FormData();
                formData.append('file', file.file);
                formData.append('taskId', action.task.id);
                return this.fileService.uploadFile(formData, action.boardId);
              }),
            )
              .pipe(take(1))
              .subscribe({
                next: () => {},
                error: () => {},
              });
          }
        }),
      );
    },
    { dispatch: false },
  );
}
