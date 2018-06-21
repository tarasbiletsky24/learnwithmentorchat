import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { PlansComponent } from './plan/plans/plans.component';
import { SpecificGroupComponent } from './specific-group/specific-group/specific-group.component';

const routes: Routes = [
{path : '', redirectTo: 'main-page', pathMatch : 'full'},
{path : 'main-page', component : MainPageComponent},
{path : 'users', component : UsersComponent},
{path : 'comment', component : CommentComponent},
{path : 'tasks', component: TasksComponent },
{path : 'plans', component: PlansComponent},
{path : 'group', component: SpecificGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
