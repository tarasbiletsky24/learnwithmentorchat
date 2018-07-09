import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';
import { AuthService } from '../../common/services/auth.service';
import { Group } from '../../common/models/group';
import { MatDialogRef } from '@angular/material';

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

  createGroup(form: NgForm) {
    let group: Group = {
      Id: 0,
      Name: form.value.Name,
      MentorId: this.authService.getUserId(),
      MentorName: this.authService.getUserFullName()
    };
      this.groupService.createGroup(group).subscribe(
        resp =>{
          if(this.httpStatusCodeService.isOk(resp.status)){
            this.alertwindow.openSnackBar(`Group successfully created`, 'Ok');
            this.thisDialogRef.close();
          } else {
            this.alertwindow.openSnackBar(`Group creation error, please try again`, 'Ok');
          }
        }
      )
  }

  ngOnInit() {
  }

}
