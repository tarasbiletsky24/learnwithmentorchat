import { Component, OnInit, Input } from '@angular/core';

import { Plan } from '../../common/models/plan';
import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
// todo remove moq object
import { TasksComponent } from '../../task/tasks/tasks.component';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

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

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.group != null) {
      this.groupService.getGroupPlans(this.group.Id).subscribe(data => this.plans = data);
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
    const dialogRef = this.dialog.open(/*AddPlanComponent */TasksComponent, {
      width: '600px',
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // todo reinit table plans
    });
  }
}
