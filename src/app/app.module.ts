import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { TasksComponent } from './task/tasks/tasks.component';
import { MatListModule, MatListBase } from '@angular/material/list';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { TaskEditorComponent } from './task/task-editor/task-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule, MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

import { MainPageComponent } from './main-page/main-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './main-page/slider/slider.component';
import { GalleryComponent } from './main-page/gallery/gallery.component';
import { BenefitsComponent } from './main-page/benefits/benefits.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from './material.module';
import { SearchingFormComponent } from './searching-form/searching-form.component';
import { AboutPageComponent } from './main-page/about-page/about-page.component';
import { ContactPageComponent } from './main-page/contact-page/contact-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    TasksComponent, TaskDetailComponent, TaskEditorComponent,
    CommentComponent,
    MainPageComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    GalleryComponent,
    BenefitsComponent,
    SearchingFormComponent,
    AboutPageComponent,
    ContactPageComponent

  ],
  imports: [
    AppRoutingModule,
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
    MatSidenavModule,
    MatTableModule,
    MaterialModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaskEditorComponent, SigninComponent, SignupComponent]

})

export class AppModule { }
