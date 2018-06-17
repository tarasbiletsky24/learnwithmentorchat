import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {

  //private taskService : TaskService
  @Input()
  task: Task;
  constructor(public dialogRef: MatDialogRef<TaskEditorComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) { this.task = data; }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(description:string) {       
    this.task.Description = description;
    /// you need to change to real user Id
    this.task.ModifierId = 0; //here
    this.taskService.updateTask(this.task).subscribe();
  }
  onDeleteClick() {
    this.taskService.deleteTask(this.task).subscribe();
  }
  ngOnInit() {
  }

}
