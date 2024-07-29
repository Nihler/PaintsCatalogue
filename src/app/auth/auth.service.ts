import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth.data.model';

import { envionment } from '../../environments/environment';

const BACKEND_URL = envionment.apiUrl + 'user/';

// TODO
// LOGIN AND LOGOUT SHOULD EMIT STATUS CHANGE

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private username: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private usernameListener = new BehaviorSubject<any>('');

  constructor(private http: HttpClient, private router: Router) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsernameListener() {
    return this.usernameListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    username: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    this.usernameListener.next(username);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.usernameListener.next(null);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
      userId: userId,
    };
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.username = authInformation.username;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.usernameListener.next(this.username);
    }
  }

  createUser(email: string, password: string, username: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      username: username,
    };
    return this.http.post(BACKEND_URL + 'signup', authData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData = {
      email: email,
      password: password,
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        username: string;
      }>(BACKEND_URL + 'login', authData)
      .subscribe(
        (response) => {
          // const token = token;
          this.token = response.token;
          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.username = response.username;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(
              this.token,
              expirationDate,
              this.userId,
              this.username
            );
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  changePassword(newPassword: any) {
    const authData = {
      password: newPassword,
    };
    return this.http.post(BACKEND_URL + 'changePassword', authData).subscribe(
      () => {
        console.log('Password changed');
      },
      (err) => {
        this.authStatusListener.next(false);
      }
    );
  }

  getIdBasedOnUsername(username: string) {
    let id;
    return this.http
      .get(BACKEND_URL + 'getId/' + username)
      .subscribe((userId) => {
        id = userId;
        return id;
      });
  }
}
