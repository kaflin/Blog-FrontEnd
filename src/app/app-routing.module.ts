import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {CreateSubredditComponent} from './subreddit/create-subreddit/create-subreddit.component';
import {ListSubredditsComponent} from './subreddit/list-subreddits/list-subreddits.component';
import {ViewPostComponent} from './post/view-post/view-post.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';



const routes: Routes = [{ path: '', component: HomeComponent },
                        { path: 'view-post/:id', component: ViewPostComponent},
                        { path: 'list-subreddits', component: ListSubredditsComponent},
                        {path: 'register', component: RegisterComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
                         { path: 'create-post', component: CreatePostComponent},
                         { path: 'edit-post/:id', component: CreatePostComponent},
                         { path: 'create-subreddit', component: CreateSubredditComponent},
                         { path: 'list-subreddits', component: ListSubredditsComponent}
                        ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
