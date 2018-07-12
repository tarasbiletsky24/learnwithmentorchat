import { Component, OnInit, Input } from '@angular/core';

import { Plan } from '../../common/models/plan';
import { GroupService } from '../../common/services/group.service';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddPlansComponent } from '../add-plans/add-plans.component';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { Group } from '../../common/models/group';
import { Router } from '@angular/router';
import { CreatePlanComponent } from '../../create-plan/create-plan.component';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-plans-display',
  templateUrl: './plans-display.component.html',
  styleUrls: ['./plans-display.component.css']
})
export class PlansDisplayComponent implements OnInit {

  @Input() group: Group;
  plans: Plan[];
  displayedColumns = ['Description', 'Create by', 'Date', 'Is published'];
  dataSource = new MatTableDataSource<Plan>(this.plans);
  isMentor = false;
  isInitialized = false;

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() { 
  }

  initialize(): void {
    if (!this.isInitialized) {
      debugger
      if (this.authService.getUserRole() === 'Mentor') {
        this.isMentor = true;
        this.displayedColumns = ['Description', 'Create by', 'Date', 'Is published', 'Delete'];
      }
      this.groupService.getGroupPlans(this.group.Id).subscribe(
        data => this.plans = data,
        err => console.log(err),
        () => {
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
      );
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openPlanAddDialog(): void {
    const dialogRef = this.dialog.open(AddPlansComponent, {
      width: '1000px',
      data: this.group.Id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.groupService.getGroupPlans(this.group.Id).subscribe(
        data => this.plans = data,
        err => console.log(err),
        () => {
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
      );
    }
    );
  }

  openPlanCreateAndAddDialog(): void {
    const dialogRef = this.dialog.open(CreatePlanComponent, {
      width: '1000px',
      data: this.group.Id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.groupService.getGroupPlans(this.group.Id).subscribe(
        data => this.plans = data,
        err => console.log(err),
        () => {
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
      );
    }
    );
  }

  delChoosenPlan(currentPlan: Plan) {
    this.groupService.removePlanFromGroup(this.group.Id, currentPlan.Id).subscribe();
    this.groupService.getGroupPlans(this.group.Id).subscribe(
      data => this.plans = data,
      err => console.log(err),
      () => {
        this.dataSource = new MatTableDataSource<Plan>(this.plans);
      }
    );
    this.alertwindow.openSnackBar(currentPlan.Name + ' deleted', 'Ok');
  }

  goToPlan(choosenPlan: Plan) {
    this.router.navigate(['group', this.group.Id, 'plan', choosenPlan.Id]);
  }

}
