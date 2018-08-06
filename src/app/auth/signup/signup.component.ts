import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Register } from '../../common/models/register';
import { NgForm } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { AuthService } from '../../common/services/auth.service';
import { Login } from '../../common/models/login';
import { EmailService } from '../../common/services/email.service';
import { Email } from '../../common/models/email';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register: Register;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,64}$';

  constructor(private userService: UserService,
    private authService: AuthService,
    private emailService: EmailService,
    public thisDialogRef:  MatDialogRef<SignupComponent>,
    private  alertwindow: AlertWindowsComponent,
    private httpStatusCodeService: HttpStatusCodeService) { }

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

  authenticate(email: string, password: string) {
    const loginData: Login = {
      Email: email,
      Password: password
    };
    this.userService.userAuthentication(loginData).subscribe( (data: any) =>
      this.authService.setUserData(data)
    );
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe((data: string) => {
      if (data.startsWith('Succesfully')) {
        this.alertwindow.openSnackBar('You are succesfully registered' , '');
        this.authenticate(form.value.Email, form.value.Password);
        this.sendEmailConfirmationInstructions(form.value.Email);
        this.closeSignupComponent();
      } else {
        this.alertwindow.openSnackBar('This email already exist' , '');
      }
    });
  }

  sendEmailConfirmationInstructions(userEmail: string) {
    const email: Email = {
      Email: userEmail
    }
    this.emailService.sendEmailConfirmationEmail(email).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.alertwindow.openSnackBar("Confirmation instructions successfully sent", 'Ok');
        }
        if (this.httpStatusCodeService.isNoContent(resp.status)) {
          this.alertwindow.openSnackBar("User not found", 'Ok');
        }
      },
      error => {
        this.alertwindow.openSnackBar(error.error.Message, "Ok");
      }
    );
  }

}
