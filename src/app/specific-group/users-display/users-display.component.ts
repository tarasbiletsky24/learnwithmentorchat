import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../common/models/user';
import { GroupService } from '../../common/services/group.service';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddUsersComponent } from '../add-users/add-users.component';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  @Input() linkId: number;
  users: User[];
  displayedColumns = ['FirstName', 'LastName', 'Role', 'Blocked'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.linkId != null) {
      this.groupService.getGroupUsers(this.linkId).subscribe(
        data => this.users = data,
        err => console.log(err),
        () => {
        this.dataSource = new MatTableDataSource<User>(this.users);
        }
      );
    } else {
      this.groupService.getGroupUsers(1).subscribe(data => this.users = data);
      console.log('No group provided');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '1000px',
      data: this.linkId
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
