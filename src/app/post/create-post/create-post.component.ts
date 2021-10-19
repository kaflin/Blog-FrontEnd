import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreatePostPayload} from './create-post.payload';
import {SubredditModel} from '../../subreddit/subreddit-response';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {SubredditService} from '../../subreddit/subreddit-service';
import {throwError} from 'rxjs';
import {PostModel} from '../../Model/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
              private subredditService: SubredditService, private route: ActivatedRoute ){
    this.postPayload = {
      description: '',
      postName: '',
      subredditName: '',
      url: ''
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required)
    });
    this.subredditService.getAllSubreddits().subscribe((data) =>
    {
      this.subreddits = data;
    },
      error => {
      throwError(error);
      });
    this.route.paramMap.subscribe(params => {
      let postId: number;
      // @ts-ignore
      postId = +params.get('id');
      if (postId)
      {
        this.getPost(postId);
      }
    });
  }


  createPost(): void{
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    },
      (error) => {
      throwError(error);
    });
  }
  discardPost(): void{
    this.router.navigateByUrl('/');
  }

  private getPost(postId: number): void{
    this.postService.updatePost(postId).subscribe(
      (post: PostModel) => this.editPost(post),
      (error) => {
        throwError(error);
      });

  }

  private editPost(post: PostModel): void {
    this.createPostForm.patchValue({
      postName: post.postName,
      subredditName: post.subredditName,
      url: post.url,
      description : post.description
    });
  }
}
