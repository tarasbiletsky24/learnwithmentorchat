import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainTag = '</>';

  constructor(private dialog: MatDialog) {

  }

  openSignInDialog(){
    let dialogRef = this.dialog.open(SigninComponent, {});
  }

  openSignUpDialog(){
    let dialogRef = this.dialog.open(SignupComponent, {});
  }

  ngOnInit() {
  }

}
