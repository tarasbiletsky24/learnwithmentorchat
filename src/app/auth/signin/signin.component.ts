import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoginError = false;

  constructor(public thisDialogRef: MatDialogRef<SigninComponent>, private userService: UserService, private router: Router) { }

  closeSigninComponent(): void {
    this.thisDialogRef.close();
  }

  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    this.userService.userAuthentication(form.value).subscribe((data: any) => {
      localStorage.setItem('userToken', data.Message);
      this.router.navigate(['/users']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

}
