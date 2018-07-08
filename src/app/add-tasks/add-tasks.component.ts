import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../common/services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../../src/app/common/models/task';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import { Observable } from 'rxjs';
import { CreatePlanComponent } from '../create-plan/create-plan.component';


@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  tasks: Task[];
  idTaskForAdd: number;
  idTasks: number[];


  dataSource = new MatTableDataSource<Task>(this.tasks);
  displayedColumns = ['Name', 'Description', 'Add'];
  constructor(private taskService: TaskService, public thisDialogRef: MatDialogRef<AddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePlanComponent
  ) {
    this.idTasks = new Array;
  }
  getTask(event: any,id: number) {
    this.idTasks.push(id);
    event.currentTarget.setAttribute('disabled', 'disabled');
  }
  console(){
    this.idTasks.forEach(element => {
      console.log(element);
    });
   
    
  }
  
  ngOnInit() {
    this.taskService.getTasks().subscribe(
      task => this.tasks = task
    );

  }

}
