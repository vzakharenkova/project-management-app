import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BoardModel } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  URL = '/boards';

  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(this.URL);
  }

  createBoard(newBoardData: Omit<BoardModel, 'id'>): Observable<BoardModel> {
    return this.http.post<BoardModel>(this.URL, newBoardData);
  }

  getBoardById(boardId: string): Observable<BoardModel> {
    return this.http.get<BoardModel>(`${this.URL}/${boardId}`);
  }

  deleteBoard(boardId: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${boardId}`);
  }

  updateBoard(boardId: string, newData: Omit<BoardModel, 'id'>): Observable<BoardModel> {
    return this.http.put<BoardModel>(`${this.URL}/${boardId}`, newData);
  }
}
