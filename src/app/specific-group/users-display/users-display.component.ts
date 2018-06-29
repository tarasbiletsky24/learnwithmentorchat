import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../common/models/user';
import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddUserComponent } from '../add-user/add-user.component';
// todo remove moq object
import { TasksComponent } from '../../task/tasks/tasks.component';

import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

/*const ELEMENT_DATA: User[] = [
  {FirstName: 'Terry', LastName: 'Patcher',Id: 1,Email:'123@gmail.com', Role: 'Admin', Blocked: false},
  {FirstName: 'John', LastName: 'Patcher',Id: 1,Email:'123@gmail.com', Role: 'Admin', Blocked: false},
  {FirstName: 'Ben', LastName: 'Patcher',Id: 1,Email:'123@gmail.com', Role: 'Admin', Blocked: false}
];*/

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  @Input() linkId: number;
  users: User[];
  displayedColumns = ['FirstName', 'LastName', 'Role', 'Blocked'];
  //dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  ngOnInit() {
    //debugger
    if (this.linkId != null) {
      this.groupService.getGroupUsers(this.linkId).subscribe(
        data => this.users = data,
        err => console.log(err),
        () => { this.dataSource = new MatTableDataSource<User>(this.users);
          console.log('data sorce users initialisated'); }
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
    const dialogRef = this.dialog.open(/*AddUserComponent*/TasksComponent, {
      width: '600px',
      data: this.linkId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // todo reinit table users
    });
  }

}
