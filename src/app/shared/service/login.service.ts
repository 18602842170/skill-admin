import { Injectable } from '@angular/core';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from './const';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { IUsers, UserService } from './users/user.service';

@Injectable()
export class LoginService {
  user: IUsers;
  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  login(code): Observable<string> {
    return this.http.post(`/user/login/`, {
      'code': code
    })
      .pipe(
        map((response) => {
          switch (response['msg']) {
            case 'success':
              const token = response['token'];
              localStorage.setItem(TOKEN_NAME, token);
              this.user = response['user'];
              this.authService.isLoggedIn = true;
              this.router.navigate([this.authService.redirectUrl]);
              return 'success';
            default:
              return 'codeError';
          }
        })
      );
  }

  verify(token): Observable<string> {
    return this.http.post(`/api-token-verify/`, {
      'token': token
    }).pipe(
      map((response) => {
        localStorage.setItem(TOKEN_NAME, response['token']);
        this.authService.isLoggedIn = true;
        this.user = response['user'];
        this.refresh(token).subscribe();
        return 'success';
      }),
      catchError((error) => {
        return ObservableOf('Login expired');
      }),
    );
  }

  refresh(token): Observable<string> {
    return this.http.post(`/api-token-refresh/`, {
      'token': token
    }).pipe(
      map((response) => {
        localStorage.setItem(TOKEN_NAME, response['token']);
        this.user = response['user'];
        return 'success';
      }),
      catchError((error) => {
        return ObservableOf('Login expired');
      }),
    );
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
}
