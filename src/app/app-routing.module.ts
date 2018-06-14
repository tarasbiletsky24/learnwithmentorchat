import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
<<<<<<< HEAD
{path : '', redirectTo: 'main-page', pathMatch : 'full'},
{path : 'main-page', component : MainPageComponent},
{path : 'users', component : UsersComponent},
{path : 'comment', component : CommentComponent},
{path : 'signin', component : SigninComponent},
{path : 'signup', component : SignupComponent}
=======
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'comment', component: CommentComponent }

>>>>>>> 0b8b6d381c558306e516439e4b93962eab81283c
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
