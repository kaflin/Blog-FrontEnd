import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import {PostModel} from '../Model/post-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts1: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts1 = post;
    });
  }

  ngOnInit(): void {
  }

}
