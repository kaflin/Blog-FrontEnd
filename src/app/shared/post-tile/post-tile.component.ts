import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {PostModel} from '../../Model/post-model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  // posts$: Array<PostModel>;
  faComments = faComments;
  @Input() posts2: PostModel[];
  constructor( private router: Router) {
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);

  }
}
