import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskModel } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  URL = '/boards';

  constructor(private http: HttpClient) {}

  getAllTasks(boardId: string, columnId: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.URL}/${boardId}/columns/${columnId}`);
  }

  createTask(
    boardId: string,
    columnId: string,
    newTaskData: Omit<TaskModel, 'id' | 'order' | 'boardId' | 'columnId'>,
  ): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.URL}/${boardId}/columns/${columnId}`, newTaskData);
  }

  getTaskById(boardId: string, columnId: string, taskId: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.URL}/${boardId}/columns/${columnId}/${taskId}`);
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${boardId}/columns/${columnId}/${taskId}`);
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    newData: Omit<TaskModel, 'id'>,
  ): Observable<TaskModel> {
    return this.http.put<TaskModel>(
      `${this.URL}/${boardId}/columns/${columnId}/${taskId}`,
      newData,
    );
  }
}
