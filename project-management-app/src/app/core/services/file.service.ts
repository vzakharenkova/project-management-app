import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { getBoardById } from '../store/actions/board.actions';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  URL = '/file';

  constructor(private http: HttpClient, private store: Store) {}

  uploadFile(file: FormData, boardId: string) {
    return this.http.post(this.URL, file, { reportProgress: true, observe: 'events' }).pipe(
      filter((event) => event.type === HttpEventType.UploadProgress),
      map((event) => event as HttpProgressEvent),
      map((event) => {
        if ((event.loaded / event.total!) * 100 === 100)
          return this.store.dispatch(getBoardById({ boardId: boardId }));
      }),
    );
  }

  downloadFile(taskId: string, fileName: string) {
    return this.http.get(`${this.URL}/${taskId}/${fileName}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
