import { Component, OnInit } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {

  task: Task;
  constructor(public dialogRef: MatDialogRef<TaskCreatorComponent>,
    private taskService: TaskService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(description: string) {
    this.task.Description = description;
    /// you need to change to real user Id
    this.task.CreatorId = 0; // here
    this.taskService.updateTask(this.task).subscribe();
  }
  onDeleteClick() {
    this.taskService.deleteTask(this.task).subscribe();
  }
  ngOnInit() {
  }


}
