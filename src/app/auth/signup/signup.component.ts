import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Register } from '../../common/models/register';
import { NgForm } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import {AlertWindowsComponent} from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register: Register;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,64}$';

  constructor(private userService: UserService,
    public thisDialogRef:  MatDialogRef<SignupComponent>,
    private  alertwindow: AlertWindowsComponent) { }

  closeSignupComponent(): void {
    this.thisDialogRef.close();
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.register = {
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    };
  }

  // TODO make animations
  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe((data: string) => {
      if (data.startsWith('Succesfully')) {
        this.alertwindow.openSnackBar('You are succesfully registered' , '');
        this.closeSignupComponent();
      } else {
        this.alertwindow.openSnackBar('This email already exist' , '');
      }
    });
  }
}
