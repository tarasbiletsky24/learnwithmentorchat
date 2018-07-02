import { Component, OnInit } from '@angular/core';
import { TaskService } from '../common/services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../../src/app/common/models/task';
import { MatDialogRef } from '@angular/material';

import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  tasks: Task[];

  dataSource = new MatTableDataSource<Task>(this.tasks);
  displayedColumns = ['Name', 'Description', 'Add'];
  constructor(private taskService: TaskService,
    private router: Router) { }
  getPlan(id: number) {
    if (id == null) {
      return false;
    }
    console.log(id);


  }
  ngOnInit() {
    this.taskService.getTasks().subscribe(
      task => this.tasks = task
    );

  }

}
