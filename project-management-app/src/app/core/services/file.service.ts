import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  URL = '/file';

  constructor(private http: HttpClient) {}

  uploadFile(taskId: string, file: FormData) {
    return this.http.post(this.URL, { taskId, file });
  }

  downloadFile(taskId: string, fileName: string) {
    return this.http.get(`${this.URL}/${taskId}/${fileName}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
