import {Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {PostModel} from '../../Model/post-model';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {


  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  constructor() { }

  ngOnInit(): void {
  }

}
