import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialog } from '@angular/material';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { TaskSubmitorComponent } from '../task-submitor/task-submitor.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input()
  task: Task;
  constructor(public dialog: MatDialog) {     
  }

  ngOnInit() {
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(TaskEditorComponent, {
      data: this.task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.task = result;
      // send to API
    });
  }

  openSubmitDialog(): void {
    const dialogRef = this.dialog.open(TaskSubmitorComponent, {
      data: this.task
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
