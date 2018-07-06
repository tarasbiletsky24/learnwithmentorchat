import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainTag = '</>';
  isLogin = false;
  fullName: string;
  constructor(private dialog: MatDialog, private router: Router) {

  }

  openSignInDialog() {
    const dialogRef = this.dialog.open(SigninComponent, {});
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignupComponent, {});
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const jwt = new JwtHelperService();
    this.fullName = localStorage.getItem('fullName');
    this.isLogin = !jwt.isTokenExpired(localStorage.getItem('userToken'));
    }
  }
