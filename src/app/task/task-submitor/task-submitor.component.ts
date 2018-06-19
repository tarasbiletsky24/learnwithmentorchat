import { Component, OnInit } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-task-submitor',
  templateUrl: './task-submitor.component.html',
  styleUrls: ['./task-submitor.component.css']
})
export class TaskSubmitorComponent implements OnInit {

  @Input()
  task: Task;
  constructor(public dialogRef: MatDialogRef<TaskEditorComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) { this.task = data; }


  ngOnInit() {
  }

}
