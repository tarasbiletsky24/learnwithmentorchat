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
import {MaterialModule} from './material.module';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import { SliderComponent } from './main-page/slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BenefitsComponent } from './main-page//benefits/benefits.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {GalleryComponent} from './main-page/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    UsersComponent,
    NavbarComponent,         
    CommentComponent, 
    SliderComponent, 
    FooterComponent, 
    MainPageComponent, 
    BenefitsComponent, 
    SignupComponent, 
    SigninComponent,
    
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
    MatTableModule,
    MaterialModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
