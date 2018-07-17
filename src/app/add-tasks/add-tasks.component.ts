import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { TaskService } from '../common/services/task.service';
import { PlanService } from '../common/services/plan.service';
import { Router } from '@angular/router';
import { Task } from '../../../src/app/common/models/task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { CreatePlanComponent } from '../create-plan/create-plan.component';
import { AlertWindowsComponent } from '.././components/alert-windows/alert-windows.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  parentValue: number;
  tasks: Task[];
  idTaskForAdd: number;
  idTasks: number;
  nameTask = '';
  descriptionTask = '';
  private = false;
  idCreator: number = this.authService.getUserId();
  private searchTerms = new Subject<string>();


  dataSource = new MatTableDataSource<Task>(this.tasks);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Name', 'Description', 'Add'];
  constructor(private taskService: TaskService,
    private planService: PlanService,
    private alertWindow: AlertWindowsComponent,
    private authService: AuthService,
    public thisDialogRef: MatDialogRef<AddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.idTasks = data;
  }
  getTask(event: any, id: number) {

    this.planService.addTaskToPlan(this.idTasks, id, null, 1).subscribe();
    event.currentTarget.setAttribute('disabled', 'disabled');

  }

  // search by name
  search(term: string): void {
    this.searchTerms.next(term);
  }


  createTask() {
    if (this.nameTask == null || this.descriptionTask == null) {
      this.alertWindow.openSnackBar('You must enter data for creating task!', 'Ok');
      return false;
    }

    const newTask = {
      Name: this.nameTask, Description: this.descriptionTask, Private: this.private, CreatorId: this.idCreator
    };
    this.taskService.createTask(newTask as Task).subscribe(res => (
      this.taskService.getTasks().subscribe(
        task => this.tasks = task))
    );
    return true;
  }

  closeAddTask(): void {
    this.thisDialogRef.close();
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.taskService.getTasksNotInPlan(this.idTasks).subscribe(
      task => this.tasks = task
    );



    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.taskService.search(term))
    ).subscribe(task => this.tasks = task);
  }

}
