import { Component, OnInit, Input } from '@angular/core';

import { Plan } from '../../common/models/plan';
import { GroupService } from '../../common/services/group.service';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddPlansComponent } from '../add-plans/add-plans.component';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-plans-display',
  templateUrl: './plans-display.component.html',
  styleUrls: ['./plans-display.component.css']
})
export class PlansDisplayComponent implements OnInit {

  @Input() linkId: number;
  plans: Plan[];
  displayedColumns = ['Description', 'Create by', 'Date', 'Is published','Delete'];
  dataSource = new MatTableDataSource<Plan>(this.plans);

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.linkId != null) {
      this.groupService.getGroupPlans(this.linkId).subscribe(
        data => this.plans = data,
        err => console.log(err),
        () => {
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
      );
    } else {
      this.groupService.getGroupPlans(1).subscribe(data => this.plans = data);
      console.log('No group provided');
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
      data: this.linkId
    });
    dialogRef.afterClosed().subscribe(result => {
      this.groupService.getGroupPlans(this.linkId).subscribe(
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
    //todo method to delete plan from group
    //this.groupService.addPlanToGroup(choosenOne.Id, this.groupId).subscribe();
    this.alertwindow.openSnackBar(currentPlan.Name + ' deleted', 'Ok');
    //todo refresh plans
  }

}
