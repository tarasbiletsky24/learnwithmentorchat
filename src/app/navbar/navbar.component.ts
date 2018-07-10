import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainTag = '</>';
  isLogin = false;
  isAdmin = false;
  fullName: string;
  constructor(private dialog: MatDialog,
    private router: Router,
    private authService: AuthService) {

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
    this.fullName = this.authService.getUserFullName();
    this.isLogin = !jwt.isTokenExpired(localStorage.getItem('userToken'));
    this.isAdmin = this.authService.isAdmin();
    }
  }
