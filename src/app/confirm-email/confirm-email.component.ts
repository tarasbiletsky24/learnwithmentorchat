import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EmailService } from '../common/services/email.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { HttpStatusCodeService } from '../common/services/http-status-code.service';
import { trigger } from '../../../node_modules/@angular/animations';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Email } from '../common/models/email';
import { AlertWindowsComponent } from '../components/alert-windows/alert-windows.component';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(public activateRoute: ActivatedRoute,
    private emailService: EmailService,
    private authService: AuthService,
    private httpStatusCodeService: HttpStatusCodeService,
    private alertwindow: AlertWindowsComponent) { }

  token: string;
  message: string;
  sendConfirmationInstructionsActive = false;
  progresSpinerActive = false;
  errorMessage: string;
  errorMessageActive = false;

  ngOnInit() {
    this.activateRoute.params.subscribe(params => this.token = params['token']);
    this.emailService.confirmUserEmail(this.token).subscribe(
      data => {
        this.message = data;
        this.authService.removeUserData();
      },
      (error: HttpErrorResponse) => {
        this.message = error.error.Message;
        this.sendConfirmationInstructionsActive = true;
      }
    );
  }

  sendEmailConfirmationInstructions(form: NgForm) {
    this.progresSpinerActive = true;
    const email: Email = {
      Email: form.value.Email
    };
    this.emailService.sendEmailConfirmationEmail(email).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.alertwindow.openSnackBar('Confirmation instructions successfully sent', 'Ok');
          this.errorMessageActive = false;
        }
        if (this.httpStatusCodeService.isNoContent(resp.status)) {
          this.activateErrorMessage('User not found');
        }
      },
      error => {
        this.activateErrorMessage(error.error.Message);
        this.progresSpinerActive = false;
      },
      () => {
        this.progresSpinerActive = false;
      }
    );
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  onEmailChange() {
    if (this.errorMessageActive) {
      this.errorMessage = null;
      this.errorMessageActive = false;
    }
  }

}
