import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';

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

  // fileUpload$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(taskUpdated),
  //     switchMap(
  //       (action) => {
  //         let allObservable = action.files?.map((file) => {
  //           let formData = new FormData();
  //           formData.append('file', file.file);
  //           formData.append('taskId', action.task.id);
  //           return this.fileService.uploadFile(formData);
  //         }) as Observable<Object>[];

  //         return forkJoin(allObservable).pipe(
  //           map(() => getBoardById({ boardId: 'df3ed84c-f4e8-41e8-b144-5ccd341b7b6a' })),
  //         );
  //       },

  // this.taskService.deleteTask(action.boardId, action.columnId, action.taskId).pipe(
  //   map(() =>
  //     taskDeleted({
  //       boardId: action.boardId,
  //       columnId: action.columnId,
  //       taskId: action.taskId,
  //     }),
  //   ),
  //   catchError((err) => of(taskDeletedError({ err }))),
  // ),
  //     ),
  //   );
  // });

  // fileUpload$ = createEffect(() => {
  //   console.log('fgerge');
  //   return this.actions$.pipe(
  //     ofType(fileUpload),
  //     switchMap((action) => {
  //       let formData = new FormData();
  //       formData.append('file', action.file.file);
  //       formData.append('taskId', action.taskid);
  //       console.log('fewfw');
  //       return this.fileService.uploadFile(formData).pipe(map((res) => getAllBoards()));
  //     }),
  //   );
  // });

  taskUpdated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(taskUpdated, taskCreated),
        tap((action) => {
          if (action.files && action.files.length) {
            action.files.forEach((file) => {
              let formData = new FormData();
              formData.append('file', file.file);
              formData.append('taskId', action.task.id);
              this.fileService
                .uploadFile(formData)
                .pipe(take(1))
                .subscribe({
                  next: (r) => console.log(r),
                  error: (err) => console.log(err),
                });
            });
            // forkJoin(
            //   action.files.map((file) => {
            //     let formData = new FormData();
            //     formData.append('file', file.file);
            //     formData.append('taskId', action.task.id);
            //     return this.fileService.uploadFile(formData);
            //   }),
            // )
            //   .pipe(take(1))
            //   .subscribe({
            //     next: () => {},
            //     error: (err) => console.log(err),
            //   });
          }
        }),
      );
    },
    { dispatch: false },
  );
}
