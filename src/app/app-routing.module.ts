import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { AboutPageComponent } from './main-page/about-page/about-page.component';
import { ContactPageComponent } from './main-page/contact-page/contact-page.component';
import { PlansComponent } from './plan/plans/plans.component';
import { SpecificGroupComponent } from './specific-group/specific-group/specific-group.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'main-page', component: MainPageComponent },
  { path: 'signin', component: MainPageComponent, children: [{ path: '', component: SigninComponent }] },
  { path: 'signup', component: MainPageComponent, children: [{ path: '', component: SignupComponent }] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: 'comment', component: CommentComponent, canActivate:[AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate:[AuthGuard] },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact-page', component: ContactPageComponent },
  { path: 'tasks', component: TasksComponent, canActivate:[AuthGuard] },
  { path: 'plans', component: PlansComponent, canActivate:[AuthGuard] },
  { path: 'group/:id', component: SpecificGroupComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
