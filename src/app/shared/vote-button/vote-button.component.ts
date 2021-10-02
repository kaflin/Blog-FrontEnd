import {Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {PostModel} from '../../Model/post-model';
import {AuthService} from '../auth.service';
import {PostService} from '../post.service';
import {VotePayload} from './vote-payload';
import {VoteService} from '../vote.service';
import {VoteType} from './vote-type';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {


  @Input() post1: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService) {

    // @ts-ignore
    this.votePayload = {
      // @ts-ignore
      voteType: undefined,
      // @ts-ignore
      postId: undefined
    };
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost()
  {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }
  downvotePost()
  {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }
  private vote(): void {
    this.votePayload.postId = this.post1.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      // this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails(): void {
    this.postService.getPost(this.post1.id).subscribe(post => {
      this.post1 = post;
    });
  }
}
