import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../common/models/user';
import { GroupService } from '../../common/services/group.service';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddUsersComponent } from '../add-users/add-users.component';
import { Group } from '../../common/models/group';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  @Input() group: Group;
  users: User[];
  displayedColumns = ['FirstName', 'LastName', 'Email', 'Role', 'Blocked', 'Delete'];
  dataSource = new MatTableDataSource<User>(this.users);
  isInitialized = false;

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.groupService.getGroupUsers(this.group.Id).subscribe(
      data => this.users = data,
      err => console.log(err),
      () => {
        this.dataSource = new MatTableDataSource<User>(this.users);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delChoosenUser(currentUser: User) {
    this.groupService.removeUserFromGroup(this.group.Id, currentUser.Id).subscribe();
    this.loadUsers();
    this.alertwindow.openSnackBar(currentUser.FirstName + ' ' + currentUser.LastName + ' deleted', 'Ok');
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '1000px',
      data: this.group.Id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

}
