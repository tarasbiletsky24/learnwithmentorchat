import { Component, OnInit } from '@angular/core';
import { EmailService } from '../common/services/email.service';
import { HttpStatusCodeService } from '../common/services/http-status-code.service';
import { AlertWindowsComponent } from '../components/alert-windows/alert-windows.component';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Email } from '../common/models/email';

@Component({
  selector: 'app-begin-password-reset',
  templateUrl: './begin-password-reset.component.html',
  styleUrls: ['./begin-password-reset.component.css']
})
export class BeginPasswordResetComponent implements OnInit {

  constructor(private emailService: EmailService,
    private httpStatusCodeService: HttpStatusCodeService,
    private alertwindow: AlertWindowsComponent) { }

  progresSpinerActive: boolean;
  progresConfirmationSpinerActive: boolean;
  errorMessage: string;
  errorMessageActive = false;
  confirmationActive = false;

  ngOnInit() {
  }

  sendEmailConfirmationInstructions(form: NgForm) {
    this.progresConfirmationSpinerActive = true;
    const email: Email = {
      Email: form.value.Email
    };
    this.emailService.sendEmailConfirmationEmail(email).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.alertwindow.openSnackBar('Confirmation instructions successfully sent', 'Ok');
          this.errorMessageActive = false;
          this.confirmationActive = false;
        }
        if (this.httpStatusCodeService.isNoContent(resp.status)) {
          this.alertwindow.openSnackBar('User not found', 'Ok');
        }
      },
      error => {
        this.activateErrorMessage(error.error.Message);
        this.progresConfirmationSpinerActive = false;
      },
      () => {
        this.progresConfirmationSpinerActive = false;
      }
    );
  }

  sendPasswordResetEmail(form: NgForm) {
    this.progresSpinerActive = true;
    const email: Email = {
      Email: form.value.Email
    };
    this.emailService.sendPasswordResetEmail(email).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.alertwindow.openSnackBar('Reset instructions successfully sent', 'Ok');
        }
        if (this.httpStatusCodeService.isNoContent(resp.status)) {
          this.activateErrorMessage('User not found');
        }
      },
      error => {
        if (this.httpStatusCodeService.isForbidden(error.status)) {
          this.confirmationActive = true;
          this.progresSpinerActive = false;
          this.activateErrorMessage(error.error.Message);
        } else {
          this.activateErrorMessage(error.error.Message);
          this.progresSpinerActive = false;
        }
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
