import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserService } from './common/services/user.service';
import { AppComponent } from './app.component';
import { UsersComponent } from './admin/user/users/users.component';
import { CommentComponent } from './task/comment/comment.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material';

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
import { PlansComponent } from './plan/plans/plans.component';
import { PlanDetailsComponent } from './plan/plan-details/plan-details.component';
import { TaskSubmitorComponent } from './task/task-submitor/task-submitor.component';
import { FormsModule } from '@angular/forms';
import { ConversationComponent } from './task/conversation/conversation.component';
import { AboutPageComponent } from './main-page/about-page/about-page.component';
import { ContactPageComponent } from './main-page/contact-page/contact-page.component';


import { SpecificGroupComponent } from './specific-group/specific-group/specific-group.component';
import { AddUserComponent } from './specific-group/add-user/add-user.component';
import { AlertWindowsComponent } from './components/alert-windows/alert-windows.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { UsersDisplayComponent } from './specific-group/users-display/users-display.component';
import { PlansDisplayComponent } from './specific-group/plans-display/plans-display.component';
import { PlanEditorComponent } from './plan/plan-editor/plan-editor.component';
import { TasksListEditorComponent } from './task/tasks-list-editor/tasks-list-editor.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    TasksComponent, TaskDetailComponent, TaskEditorComponent, TasksListEditorComponent,
    CommentComponent,
    MainPageComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    GalleryComponent,
    BenefitsComponent,
    AboutPageComponent,
    ContactPageComponent,
    PlansComponent,
    PlanDetailsComponent,
    TaskSubmitorComponent,
    ConversationComponent,
    SpecificGroupComponent,
    AddUserComponent,
    AlertWindowsComponent,
    ConfirmDialogComponent,
    UsersDisplayComponent,
    PlansDisplayComponent, PlanEditorComponent, CreatePlanComponent, AddTasksComponent

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
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule
    ],

  entryComponents: [TaskEditorComponent,
    ConfirmDialogComponent,
    TaskSubmitorComponent,
    ConversationComponent,
    SigninComponent,
    SignupComponent,
    AboutPageComponent,
    ContactPageComponent,
    PlanEditorComponent,
    AddTasksComponent
  ],
  providers: [UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],

})

export class AppModule { }
