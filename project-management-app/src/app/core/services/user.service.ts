import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = '/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.URL);
  }

  getUserById(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.URL}/${userId}`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${userId}`);
  }

  updateUser(
    userId: string,
    newData: Omit<UserModel, 'id'> & { password: string },
  ): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.URL}/${userId}`, newData);
  }
}
