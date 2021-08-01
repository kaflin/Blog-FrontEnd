import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from '../Model/Login-request.payload';
import {LoginResponse} from '../Model/login-response';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
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
}
