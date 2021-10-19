import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from '../Model/Login-request.payload';
import {LoginResponse} from '../Model/login-response';
import {LocalStorageService} from 'ngx-webstorage';
import {map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }
  login( loginRequestPayload: LoginRequestPayload): Observable<boolean>
  {
       return this.httpClient.post<LoginResponse>('http://localhost:8081/api/auth/login', loginRequestPayload)
        .pipe(map(data => {
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          return true;
        }));
  }
  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }
  refreshToken(): Observable<LoginResponse> {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };
    return this.httpClient.post<LoginResponse>('http://localhost:8081/api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));

  }
  logout(): void {
    this.httpClient.post('http://localhost:8081/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }


  getUserName(){
    return this.localStorage.retrieve('username');
  }
  getExpirationTime(): void{
    return this.localStorage.retrieve('expiresAt');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

