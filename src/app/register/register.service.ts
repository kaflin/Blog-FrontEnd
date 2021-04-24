import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../user/user.model';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../app.constants';

@Injectable({providedIn: 'root'})
export class RegisterService
{
  constructor(private http: HttpClient) {
  }

  signup(account: IUser): Observable<any>
  {

    return this.http.post(SERVER_API_URL + 'api/auth/signup', account, { responseType: 'text'});
  }
}
