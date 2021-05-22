import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // sidenav: any;
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])

  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  ngOnInit(): void {
  }

  constructor(private router: Router) {
  }

  navigateToFirst() {
    this.router.navigate(['login']);
  }

  navigateToSecond() {
    this.router.navigate(['register']);
  }
}
