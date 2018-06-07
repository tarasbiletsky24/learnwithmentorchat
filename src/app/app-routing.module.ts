import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';

const routes: Routes=[
{path: '', redirectTo:'/users', pathMatch: 'full'},
{path: 'users', component: UsersComponent},
{path: 'comment', component: CommentComponent}

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
 exports: [RouterModule]
})
export class AppRoutingModule { }
