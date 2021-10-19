import {Component, HostListener, OnInit} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // sidenav: any;
  faUser = faUser;
  isSticky: boolean = false;
  isLoggedIn: boolean;
  username: string;

  @HostListener('window:scroll', ['$event'])

  checkScroll(): void{
    this.isSticky = window.pageYOffset >= 250;
  }

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }


  navigateToFirst(): void {
    this.router.navigate(['login']);
  }

  navigateToSecond(): void {
    this.router.navigate(['register']);
  }
  goToUserProfile(): void{
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
