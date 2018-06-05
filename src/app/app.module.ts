import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './admin/user/users/users.component';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import { UserBlockComponent } from './admin/user/user-block/user-block.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';





@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserBlockComponent,
    NavbarComponent,
  

       
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule



 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
