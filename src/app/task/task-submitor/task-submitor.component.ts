import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';
import { UserTask } from '../../common/models/userTask';

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
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
      this.task = data; 
    }
  
  onCancelClick() {
    if(this.previousResult != this.userTask.Result){
      if(window.confirm('You have unsaved changes in your result. Do you want to save it?')){
        this.saveChanges();
      }
    }
    this.dialogRef.close();
  }

  onSubmitClick(){
    this.saveChanges();
  }

  saveChanges() {
    const utask = {Id: this.userTask.Id, Result: this.userTask.Result};
    this.taskService.updateUserTaskResult(utask as UserTask).subscribe(ut => ut.headers);
  }

  notExisting() {
    this.dialogRef.close();
    window.alert('sorry');
  }

  ngOnInit() {
    const userId = 3;
    //todo: add logic for getting user id from local storage if authorized
    this.taskService.getUserTask(this.task.PlanTaskId, userId).subscribe(
      ut => {
        if(!ut.ok) {
          this.notExisting();
        } else {
          this.userTask = ut.body;
          this.previousResult = ut.body.Result;
        }
      }
    );
  }

}
