import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthDataModel, UserModel } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(userData: Omit<AuthDataModel, 'name'>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/signin', userData);
  }

  signUp(newUserData: AuthDataModel): Observable<UserModel> {
    return this.http.post<UserModel>('/signup', newUserData);
  }
}
