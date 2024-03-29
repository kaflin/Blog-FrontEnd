import {HttpClient} from '@angular/common/http';
import {VotePayload} from './vote-button/vote-payload';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService
{
  constructor(private http: HttpClient) {}

  vote(votePayload: VotePayload): Observable<any>
  {
    return this.http.post('http://localhost:8081/api/votes', votePayload);
  }
}
