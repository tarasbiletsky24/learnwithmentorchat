import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { AddUsersComponent } from '../add-users/add-users.component';
import { GroupService } from '../../../common/services/group.service';
import { AlertWindowsComponent } from '../../../components/alert-windows/alert-windows.component';
import { Group } from '../../../common/models/group';
import { User } from '../../../common/models/user';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { HttpStatusCodeService } from '../../../common/services/http-status-code.service';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    private httpStatusCodeService: HttpStatusCodeService,
    public dialog: MatDialog) { }

  @Input() group: Group;
  users: User[];
  displayedColumns = ['Name', 'Email', 'Role', 'Blocked', 'Delete'];
  dataSource: MatTableDataSource<User>;
  isInitialized = false;
  dataLoaded = false;
  errorMessage: string;
  errorMessageActive = false;
  dialogSize = '75%';
  filterErrorMessage: string;
  filterErrorMessageActive = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.groupService.getGroupUsers(this.group.Id).subscribe(
      data => this.users = data,
      (error: HttpErrorResponse) => {
        this.filterErrorMessageActive = false;
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        if (this.users === undefined || this.users.length < 1) {
          this.filterErrorMessageActive = false;
          this.activateErrorMessage('There are no users in this group');
          this.users = [];
        } else {
          this.filterErrorMessageActive = false;
          this.errorMessageActive = false;
          this.initializeDataSource(this.users);
        }
        this.dataLoaded = true;
      }
    );
  }

  initializeDataSource(usersList: User[]) {
    this.dataSource = new MatTableDataSource<User>(usersList);
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.FirstName + ' ' + data.LastName;
      return dataStr.indexOf(filter) !== -1;
    };
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  activateFilterErrorMessage(message: string): void {
    this.filterErrorMessage = message;
    this.filterErrorMessageActive = true;
  }

  applyFilter(filterValue: string) {
    this.filterErrorMessageActive = false;
    this.dataSource.filter = filterValue;
    if (this.dataSource.filteredData.length < 1) {
      this.activateFilterErrorMessage('There are no users by this key');
    }
  }

  delChoosenUser(event: any, currentUser: User) {
    const target = event.currentTarget;
    target.disabled = true;
    this.groupService.removeUserFromGroup(this.group.Id, currentUser.Id).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          const index = this.users.indexOf(currentUser, 0);
          if (index > -1) {
            this.users.splice(index, 1);
            this.initializeDataSource(this.users);
          }
          this.alertwindow.openSnackBar(currentUser.FirstName + ' ' + currentUser.LastName + ' deleted', 'Ok');
          if (this.users === undefined || this.users.length < 1) {
            this.activateErrorMessage('There are no users in this group');
            this.users = [];
          }
        }
      },
      error => {
        target.disabled = false;
        this.alertwindow.openSnackBar('Error ocurred on deletion: ' + currentUser.FirstName + ' '
          + currentUser.LastName + ' please try again', 'Ok');
      }
    );
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: this.dialogSize,
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
