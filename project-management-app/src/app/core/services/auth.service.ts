import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthDataModel, UserModel } from '../../shared/models/user.model';
import { logOut } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store, private router: Router) {}

  signIn(userData: Omit<AuthDataModel, 'name'>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/signin', userData);
  }

  signUp(newUserData: AuthDataModel): Observable<UserModel> {
    return this.http.post<UserModel>('/signup', newUserData);
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logOut());
    this.router.navigateByUrl('/welcome');
  }
}
