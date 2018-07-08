import { Component, OnInit, Inject, Attribute } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatButton, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  groups: Group[];
  userId: number;
  userRole: string;
  userName: string;

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('id'));
    this.userRole = localStorage.getItem('role');
    this.userName = localStorage.getItem('fullName');
    this.groupService.getUserGroups(this.userId).subscribe(
      data => this.groups = data
    );
  }

  openGroupCreateDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.groupService.getUserGroups(this.userId).subscribe(
        data => this.groups = data
      );
    }
    );
  }
}
