import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ColumnModel } from '../../shared/models/column.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  URL = '/boards';

  constructor(private http: HttpClient) {}

  getAllColumns(boardId: string): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>(`${this.URL}/${boardId}/columns`);
  }

  createColumn(boardId: string, newColumnData: Omit<ColumnModel, 'id'>): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`${this.URL}/${boardId}/columns`, newColumnData);
  }

  getColumnById(boardId: string, columnId: string): Observable<ColumnModel> {
    return this.http.get<ColumnModel>(`${this.URL}/${boardId}/columns/${columnId}`);
  }

  deleteColumn(boardId: string, columnId: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${boardId}/columns/${columnId}`);
  }

  updateColumn(
    boardId: string,
    columnId: string,
    newData: Omit<ColumnModel, 'id'>,
  ): Observable<ColumnModel> {
    return this.http.put<ColumnModel>(`${this.URL}/${boardId}/columns/${columnId}`, newData);
  }
}
