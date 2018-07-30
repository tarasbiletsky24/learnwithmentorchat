import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserTask } from '../../common/models/userTask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { DialogsService } from '../../components/dialogs/dialogs.service';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';
import { AuthService } from '../../common/services/auth.service';
import { TaskService } from '../../common/services/task.service';
import { DateTime } from 'date-time-js';

@Component({
  selector: 'app-suggest-deadline',
  templateUrl: './suggest-deadline.component.html',
  styleUrls: ['./suggest-deadline.component.css']
})
export class SuggestDeadlineComponent implements OnInit {
 
  @Input()
  private task: string;
  private userTask: UserTask;
  private suggestedDeadline: DateTime;
  private deadline: string;
  private suggest: string = "You have not suggested deadline yet";

  constructor(public dialogRef: MatDialogRef<SuggestDeadlineComponent>,
    private  alertwindow: AlertWindowsComponent,
    private dialogsService: DialogsService,
    private taskService: TaskService,
    private authService: AuthService,
    private httpStatusCodeService: HttpStatusCodeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userTask = data.userTask;
    this.task = data.taskName;
    this.suggestedDeadline = data.userTask.ProposeEndDate;
  }

  onCancelClick() {
    //TODO fix problem with Equal
    //if (!this.suggestedDeadline.isEqual(this.userTask.ProposeEndDate)) {
      //this.dialogsService
      //.confirm('Confirm Dialog', 'You have unsaved changes. Do you want to save them?')
      //.subscribe(res => {
        //if (res) {
          //this.saveChanges();
          //this.alertwindow.openSnackBar('Your changes are saved!' , 'Ok');
        //}
      //});
    //}
    this.dialogRef.close();
  }

  saveChanges() {
    this.taskService.updateProposedEndDate(this.userTask.Id, this.userTask.ProposeEndDate).subscribe();
  }

  onSubmitClick() {
    this.saveChanges();
  }

  parseDate(){
    this.deadline = this.userTask.EndDate.toString().split('T')[0];
    if(this.userTask.ProposeEndDate != null){
      this.suggest = this.userTask.ProposeEndDate.toString().split('T')[0];
    }
  }
  
  ngOnInit() {
    this.parseDate();
  }

}
