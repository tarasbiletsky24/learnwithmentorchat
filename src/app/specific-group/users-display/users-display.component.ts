import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../common/models/user';
import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddUserComponent } from '../add-user/add-user.component';
// todo remove moq object
import { TasksComponent } from '../../task/tasks/tasks.component';

import { MatDialog } from '@angular/material';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  @Input() group: Group;
  users: User[];
  displayedColumns = ['FirstName', 'LastName', 'Role', 'Blocked'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.groupService.getGroupUsers(this.group.Id).subscribe(data => this.users = data);
    /*if (this.group != null) {
      this.groupService.getGroupUsers(this.group.Id).subscribe(data => this.users = data);
      alert("Downloaded ok");
    } else {
      //alert("No group provided");
    }*/
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(/*AddUserComponent*/TasksComponent, {
      width: '600px',
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // todo reinit table users
    });
  }

}
