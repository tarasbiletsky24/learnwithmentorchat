import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import { TasksComponent } from './task/tasks/tasks.component';
import {MatListModule, MatListBase} from '@angular/material/list';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule, MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import { TaskEditorComponent } from './task/task-editor/task-editor.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule, MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,         
    CommentComponent, TasksComponent, TaskDetailComponent, TaskEditorComponent    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatSidenavModule
  ],
  entryComponents: [TaskEditorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
