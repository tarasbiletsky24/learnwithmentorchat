import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { Observable } from 'rxjs';
import { Task } from '../../../src/app/common/models/task';
import { createElementCssSelector } from '@angular/compiler';
import { Plan } from '../common/models/plan';
import { Image } from '.././common/models/image';
import { AlertWindowsComponent } from '.././components/alert-windows/alert-windows.component';

import { DomSanitizer } from '@angular/platform-browser';
import { PlanService } from '.././common/services/plan.service';
import { TaskService } from '../common/services/task.service';
import { HttpStatusCodeService } from '.././common/services/http-status-code.service';


@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']



})


export class CreatePlanComponent implements OnInit {
  tasks: Observable<Task>;
  currentId: number;
  idTasks = 5;
  name = '';
  description = '';
  published: boolean;
  addTask = false;
  result: Task[];
  tableEmpty = false;
  createdPlan = false;
  displayedColumns = ['Name', 'Description'];


  selectedFile: File = null;
  idCreator: number = +localStorage.getItem('id');
  private maxImageSize: number = 1024 * 1024;
  imageData = '../../../assets/images/LWMTagBlack.png';
  selectedImage = null;
  constructor(private dialog: MatDialog,
    private planService: PlanService,
    private taskService: TaskService,
    private alertWindow: AlertWindowsComponent,
    private httpStatusCodeService: HttpStatusCodeService, ) {


  }

  openAddTasks(): void {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      width: '1000px',
      data: this.currentId

    });
    dialogRef.afterClosed().subscribe(result => {
      this.idTasks = result;
      this.tableEmpty = true;

      this.taskService.getTasks(this.currentId).subscribe(

        task => {
          this.result = task;
          console.log(this.result);
        }


      );
    });
  }
  checkSomething() {
    return this.createdPlan;
  }
  createPlan() {
    if (this.name === '' || this.description === '') {
      this.alertWindow.openSnackBar('You must enter data for creating plan!', 'Ok');
      this.addTask = false;
    }
      this.published = false;
      const plan = {
        Name: this.name, Description: this.description, Published: this.published, CreatorId: this.idCreator
      };
      this.planService.createPlan(plan as Plan).subscribe(res => {
        this.addTask = true;
        this.currentId = res;
        this.createdPlan = true;
        if (this.selectedFile) {
          this.planService.updateImage(this.currentId, this.selectedFile).subscribe(
            this.selectedFile = null
          );
        }
      });
    this.alertWindow.openSnackBar('You create plan " ' + this.name + '"', 'Ok');

  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size > this.maxImageSize) {
      this.alertWindow.openSnackBar(`Image size must be less then ${this.maxImageSize / (1024 * 1024)} mb, please select another`, 'Ok');
      this.selectedFile = null;
    } else {
      const preview = document.getElementById('newImage') as HTMLImageElement;
      const reader = new FileReader();
      reader.onloadend = function () {
        preview.src = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  ngOnInit() {

  }
}
