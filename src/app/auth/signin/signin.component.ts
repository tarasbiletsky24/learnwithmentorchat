import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SigninComponent>, private auth: AuthService,
    private userService: UserService, private router: Router,
    private  alertwindow: AlertWindowsComponent) { }

  closeSigninComponent(): void {
    this.thisDialogRef.close();
  }

  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    this.userService.userAuthentication(form.value).subscribe((data: any) => {
      this.auth.setUserData(data);
      this.closeSigninComponent();
    },
    (err: HttpErrorResponse) => {
      this.alertwindow.openSnackBar('Incorrect email or password', '');
    });
  }
}
