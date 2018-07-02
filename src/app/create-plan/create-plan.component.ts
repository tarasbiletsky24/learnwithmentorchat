import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  openAddTasks() {
    const dialogRef = this.dialog.open(AddTasksComponent, {});
  }
  ngOnInit() {
  }

}
