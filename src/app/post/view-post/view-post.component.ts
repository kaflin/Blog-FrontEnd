import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../Model/post-model';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {CreatePostPayload} from '../create-post/create-post.payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;
    // this.postService.getPost(this.postId).subscribe(data => {
    //   this.post = data;
    // }, (error: any) =>
    // {
    //   throwError((error));
    // });
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById(): void {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, (error: any) => {
      throwError((error));
    });
  }
}
