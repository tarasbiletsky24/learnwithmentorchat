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

  constructor(public dialogRef: MatDialogRef<TaskSubmitorComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
      this.task = data; 
    }
  
  onCancelClick() {

  }

  ngOnInit() {
    const userId = 3;
    //todo: add logic for getting user id from local storage if authorized
    this.taskService.getUserTask(this.task.PlanTaskId, userId).subscribe(
      ut => this.userTask = ut
    );
  }

}
