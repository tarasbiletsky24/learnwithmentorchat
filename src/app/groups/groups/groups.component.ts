import { Component, OnInit, Inject, Attribute } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatButton, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { Router } from '@angular/router';
import { AddPlansComponent } from '../../specific-group/add-plans/add-plans.component';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
    private router: Router,
    public dialog: MatDialog) { }

  displayedColumns = ['Name', 'MentorId', 'Link'];
  groups: Group[];
  dataSource = new MatTableDataSource<Group>(this.groups);
  userId: number;

  ngOnInit() { 
    this.userId =parseInt(localStorage.getItem('id')); 
    this.groupService.getUserGroups(this.userId).subscribe(
      data => this.groups = data
    );
  }

  goToGroup(choosenGroup: Group) {
    this.router.navigate(['group',choosenGroup.Id]);
  }

  openPlanAddDialog(group: Group): void {
    const dialogRef = this.dialog.open(AddPlansComponent, {
      width: '1000px',
      data: group.Id
    });
    //todo refresh plans for group after close
    // dialogRef.afterClosed().subscribe(result => {
    //   this.groupService.getGroupPlans(this.linkId).subscribe(
    //     data => this.plans = data,
    //     err => console.log(err),
    //     () => {
    //       this.dataSource = new MatTableDataSource<Plan>(this.plans);
    //     }
    //   );
    // }
    // );
  }

}
