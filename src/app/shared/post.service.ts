import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostModel} from '../Model/post-model';
import {CreatePostPayload} from '../post/create-post/create-post.payload';
import {SubredditModel} from '../subreddit/subreddit-response';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.baseUrl + '/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(this.baseUrl + '/api/posts/', postPayload);
  }

  getPost(postId: number): Observable<PostModel>{
    return this.http.get<PostModel>(this.baseUrl + '/api/posts/' + postId);

  }

  updatePost(postId: number): Observable<any>
    {
    return this.http.get(this.baseUrl +  '/api/posts/update/' + postId);
    }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.baseUrl + '/api/posts/by-user/' + name);
  }
}
