import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { Observable } from 'rxjs';
import { Task } from '../../../src/app/common/models/task';
import { createElementCssSelector } from '@angular/compiler';
import { Image } from '.././common/models/image';

import { AlertWindowsComponent } from '.././components/alert-windows/alert-windows.component';

import { DomSanitizer } from '@angular/platform-browser';

import { PlanService } from '.././common/services/plan.service';

export interface AddTasksComponent{
  idTasks;
}

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})


export class CreatePlanComponent implements OnInit {
  tasks: Observable<Task>;
  idTasks: number[];
  selectedFile: File = null;
  private maxImageSize: number = 1024 * 1024;
  imageData = '../../../assets/images/1.png';
  selectedImage = null;
  constructor(private dialog: MatDialog,
    private planService: PlanService,
    private alertWindow: AlertWindowsComponent) {
      
  }

  openAddTasks(): void {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      width: '1000px',
      data: { idTasks:this.idTasks}        

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("!!!!");
      console.log(result);
      
      this.idTasks=result;
    

    });
  }
  createPlan() {
    console.log(this.idTasks);
    
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
