import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddUsersComponent } from '../add-users/add-users.component';
import { GroupService } from '../../../common/services/group.service';
import { AlertWindowsComponent } from '../../../components/alert-windows/alert-windows.component';
import { Group } from '../../../common/models/group';
import { User } from '../../../common/models/user';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    public dialog: MatDialog) { }

  @Input() group: Group;
  users: User[];
  displayedColumns = ['FirstName', 'LastName', 'Email', 'Role', 'Blocked', 'Delete'];
  dataSource = new MatTableDataSource<User>(this.users);
  isInitialized = false;
  dataLoaded = false;
  errorMessage: string;
  errorMessageActive = false;

  ngOnInit() {
    this.dataLoaded = false;
    this.loadUsers();
  }

  loadUsers(): void {
    this.groupService.getGroupUsers(this.group.Id).subscribe(
      data => this.users = data,
      (error: HttpErrorResponse) => {
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        if (this.users === null || this.users.length < 1) {
          this.activateErrorMessage('There are no users in this group');
          this.dataSource = new MatTableDataSource<User>([]);
        } else {
          this.errorMessageActive = false;
          this.dataSource = new MatTableDataSource<User>(this.users);
        }
        this.dataLoaded = true;
      }
    );
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delChoosenUser(event: any, currentUser: User) {
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.groupService.removeUserFromGroup(this.group.Id, currentUser.Id).subscribe(
      data => { },
      error => {
        event.currentTarget.setAttribute('disabled', 'enabled');
        this.alertwindow.openSnackBar('Error ocurred on deletion: ' + currentUser.FirstName + ' '
        + currentUser.LastName + ' please try again', 'Ok');
      },
      () => {
        const index = this.users.indexOf(currentUser, 0);
        if (index > -1) {
          this.users.splice(index, 1);
          this.dataSource = new MatTableDataSource<User>(this.users);
        }
        this.alertwindow.openSnackBar(currentUser.FirstName + ' ' + currentUser.LastName + ' deleted', 'Ok');
        if (this.users === null || this.users.length < 1) {
          this.activateErrorMessage('There are no users in this group');
          this.dataSource = new MatTableDataSource<User>([]);
        }
      }
    );
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '75%',
      data: this.group.Id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataLoaded = false;
        this.loadUsers();
      }
    });
  }

}
