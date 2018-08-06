import { Component, OnInit } from '@angular/core';
import { EmailService } from '../common/services/email.service';
import { HttpStatusCodeService } from '../common/services/http-status-code.service';
import { AlertWindowsComponent } from '../components/alert-windows/alert-windows.component';
import { Email } from '../common/models/email';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-email-not-confirmed',
  templateUrl: './email-not-confirmed.component.html',
  styleUrls: ['./email-not-confirmed.component.css']
})
export class EmailNotConfirmedComponent implements OnInit {

  constructor(private emailService: EmailService,
    private authService: AuthService,
    private httpStatusCodeService: HttpStatusCodeService,
    private alertwindow: AlertWindowsComponent) { }

  ngOnInit() {
  }

  sendEmailConfirmationInstructions() {
    const email: Email = {
      Email: this.authService.getUserEmail()
    };
    this.emailService.sendEmailConfirmationEmail(email).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.alertwindow.openSnackBar('Confirmation instructions successfully sent', 'Ok');
        }
        if (this.httpStatusCodeService.isNoContent(resp.status)) {
          this.alertwindow.openSnackBar('User not found', 'Ok');
        }
      },
      error => {
        this.alertwindow.openSnackBar(error.error.Message, 'Ok');
      }
    );
  }

}
