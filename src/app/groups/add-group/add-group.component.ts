import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';
import { AuthService } from '../../common/services/auth.service';
import { Group } from '../../common/models/group';
import { MatDialogRef } from '@angular/material';
import { HttpResponse, HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private authService: AuthService,
    private httpStatusCodeService: HttpStatusCodeService,
    public thisDialogRef: MatDialogRef<AddGroupComponent>,
    private alertwindow: AlertWindowsComponent,
    private groupService: GroupService) { }

  progresSpinerActive: boolean;
  errorMessage: string;
  errorMessageActive = false;
  groupName: string;
  someGroupCreated = false;

  ngOnInit() {
    this.thisDialogRef.disableClose = true;
    this.thisDialogRef.backdropClick().subscribe(result => {
      this.thisDialogRef.close(this.someGroupCreated);
  });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.thisDialogRef.close(this.someGroupCreated);
  }

  createGroup(form: NgForm) {
    this.progresSpinerActive = true;
    form.form.disable();
    const group: Group = {
      Id: 0,
      Name: form.value.Name,
      MentorId: this.authService.getUserId(),
      MentorName: this.authService.getUserFullName()
    };
    this.groupService.createGroup(group).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.someGroupCreated = true;
          this.alertwindow.openSnackBar(resp.body, 'Ok');
        }
      },
      error => {
        this.activateErrorMessage(error.error.Message);
        form.form.enable();
        this.progresSpinerActive = false;
      },
      () => {
        form.form.enable();
        this.progresSpinerActive = false;
      }
    );
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  onGroupNameChange() {
    if (this.errorMessageActive) {
      this.errorMessage = null;
      this.errorMessageActive = false;
    }
  }
}
