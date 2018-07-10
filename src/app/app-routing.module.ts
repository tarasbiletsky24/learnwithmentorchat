import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard} from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { MentorGuard } from './auth/mentor.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { AboutPageComponent } from './main-page/about-page/about-page.component';
import { ContactPageComponent } from './main-page/contact-page/contact-page.component';
import { PlansComponent } from './plan/plans/plans.component';

import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { SpecificGroupComponent } from './specific-group/specific-group/specific-group.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { GroupsComponent } from './groups/groups/groups.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'comment', component: CommentComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact-page', component: ContactPageComponent },
  { path: 'plan/:id/edit', component: SpecificGroupComponent, canActivate: [AuthGuard, MentorGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'listTasks', component: AddTasksComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlansComponent, canActivate: [AuthGuard] },
  { path: 'create-plan', component: CreatePlanComponent, canActivate: [AuthGuard, MentorGuard] },
  { path: 'mygroups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
