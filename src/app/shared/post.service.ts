import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostModel} from '../Model/post-model';
import {CreatePostPayload} from '../post/create-post/create-post.payload';
import {SubredditModel} from '../subreddit/subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8081/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8081/api/posts/', postPayload);
  }

  getPost(postId: number): Observable<PostModel>{
    return this.http.get<PostModel>('http://localhost:8081/api/posts/' + postId);

  }
}
