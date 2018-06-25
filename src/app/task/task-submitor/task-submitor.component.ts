import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';
import { UserTask } from '../../common/models/userTask';
import {AlertWindowsComponent} from '../../components/alert-windows/alert-windows.component';
import {DialogsService} from '../../components/dialogs/dialogs.service';

@Component({
  selector: 'app-task-submitor',
  templateUrl: './task-submitor.component.html',
  styleUrls: ['./task-submitor.component.css']
})
export class TaskSubmitorComponent implements OnInit {

  @Input()
  task: Task;
  private userTask: UserTask;
  private previousResult: string;
  private exists: boolean;

  constructor(public dialogRef: MatDialogRef<TaskSubmitorComponent>,
    private  alertwindow: AlertWindowsComponent,
    private dialogsService: DialogsService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.task = data;
  }

  onCancelClick() {
    if (this.previousResult !== this.userTask.Result) {
      this.dialogsService
      .confirm('Confirm Dialog', 'You have unsaved changes. Do you want to save them?')
      .subscribe(res => {
        if (res) {
          this.saveChanges();
          this.alertwindow.openSnackBar('Your changes are saved!' , 'Ok');
        }
      });
    }
    this.dialogRef.close();
  }

  onSubmitClick() {
    this.saveChanges();
  }

  saveChanges() {
    const utask = { Id: this.userTask.Id, Result: this.userTask.Result };
    this.taskService.updateUserTaskResult(utask as UserTask).subscribe(ut => ut.headers);
  }

  notExisting() {
    this.dialogRef.close();
    this.alertwindow.openSnackBar('You are not asigned to this plan!' , 'Ok');
  }

  ngOnInit() {
    const userId = 3;
    // todo: add logic for getting user id from local storage if authorized
    this.taskService.getUserTask(this.task.PlanTaskId, userId).subscribe(
      ut => {
        if (!ut.ok) {
          this.notExisting();
        } else {
          this.userTask = ut.body;
          this.previousResult = ut.body.Result;
        }
      }
    );
  }

}
