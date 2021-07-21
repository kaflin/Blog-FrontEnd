import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginRequestPayload} from '../Model/Login-request.payload';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>
  {
    kfkkfk

    hjdjjn

  }
}
