import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../Model/post-model';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {CreatePostPayload} from '../create-post/create-post.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentPayload} from '../../comment/comment-payload';
import {CommentService} from '../../comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  comments: CommentPayload[];
  commentPayload: CommentPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }
  // tslint:disable-next-line:typedef
  postComment(){
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, (error: any) => {
      throwError(error);
    });
  }


  private getPostById(): void {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, (error: any) => {
      throwError((error));
    });
  }

  private getCommentsForPost(): void {
    this.commentService.getAllCommentsForPost(this.postId).subscribe( data =>
    {
      this.comments = data;
    }, (error: any) => {
      throwError((error));
    });

  }
}
