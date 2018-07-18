import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddPlansComponent } from '../add-plans/add-plans.component';
import { Router } from '@angular/router';
import { GroupService } from '../../../common/services/group.service';
import { AlertWindowsComponent } from '../../../components/alert-windows/alert-windows.component';
import { AuthService } from '../../../common/services/auth.service';
import { Group } from '../../../common/models/group';
import { Plan } from '../../../common/models/plan';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { CreatePlanComponent } from '../../../create-plan/create-plan.component';

@Component({
  selector: 'app-plans-display',
  templateUrl: './plans-display.component.html',
  styleUrls: ['./plans-display.component.css']
})
export class PlansDisplayComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog) { }

  @Input() group: Group;
  plans: Plan[];
  displayedColumns = ['Name', 'Description', 'Creator', 'Date'];
  dataSource = new MatTableDataSource<Plan>(this.plans);
  isMentor = false;
  isInitialized = false;
  dataLoaded = false;
  errorMessage: string;
  errorMessageActive = false;

  filterErrorMessage: string;
  filterErrorMessageActive = false;

  ngOnInit() { }

  initialize(): void {
    if (!this.isInitialized) {
      if (this.authService.isMentor()) {
        this.isMentor = true;
        this.displayedColumns = ['Name', 'Description', 'Creator', 'Date', 'Delete'];
      }
      this.loadPlans();
      this.isInitialized = true;
    }
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  activateFilterErrorMessage(message: string): void {
    this.filterErrorMessage = message;
    this.filterErrorMessageActive = true;
  }

  loadPlans(): void {
    this.groupService.getGroupPlans(this.group.Id).subscribe(
      data => this.plans = data,
      (error: HttpErrorResponse) => {
        this.filterErrorMessageActive = false;
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        if (this.plans === null || this.plans.length < 1) {
          this.filterErrorMessageActive = false;
          this.activateErrorMessage('There are no plans in this group');
          this.dataSource = new MatTableDataSource<Plan>([]);
        } else {
          this.errorMessageActive = false;
          this.filterErrorMessageActive = false;
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
        this.dataLoaded = true;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.filterErrorMessageActive = false;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length < 1) {
      this.activateFilterErrorMessage('There are no plans by this key');
    }
  }

  openPlanAddDialog(): void {
    const dialogRef = this.dialog.open(AddPlansComponent, {
      width: '75%',
      data: this.group.Id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataLoaded = false;
        this.loadPlans();
      }
    }
    );
  }

  delChoosenPlan(event: any, currentPlan: Plan) {
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.groupService.removePlanFromGroup(this.group.Id, currentPlan.Id).subscribe(
      data => { },
      error => {
        event.currentTarget.setAttribute('disabled', 'enabled');
        this.alertwindow.openSnackBar('Error ocurred on deletion: ' + currentPlan.Name + ' please try again', 'Ok');
      },
      () => {
        const index = this.plans.indexOf(currentPlan, 0);
        if (index > -1) {
          this.plans.splice(index, 1);
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
        this.alertwindow.openSnackBar(currentPlan.Name + ' deleted', 'Ok');
        if (this.plans === null || this.plans.length < 1) {
          this.activateErrorMessage('There are no plans in this group');
          this.dataSource = new MatTableDataSource<Plan>([]);
        }
      }
    );
  }

  goToPlan(choosenPlan: Plan) {
    this.router.navigate(['group', this.group.Id, 'plan', choosenPlan.Id]);
  }

}
