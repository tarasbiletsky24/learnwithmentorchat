import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../common/models/user';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.groupId = data;
  }

  displayedColumns = ['FirstName', 'LastName', 'Email', 'Role', 'Blocked', 'Check'];
  users: User[];
  dataSource = new MatTableDataSource<User>(this.users);
  private searchTerms = new Subject<string>();
  groupId: number;

  addChoosenUser(event: any, choosenOne: User) {
    this.groupService.addUserToGroup(choosenOne.Id, this.groupId).subscribe();
    this.alertwindow.openSnackBar(choosenOne.FirstName + ' ' + choosenOne.LastName + ' added', 'Ok');
    event.currentTarget.setAttribute('disabled', 'disabled');
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.groupService.searchNotUsers('', this.groupId).subscribe(
      user => this.users = user
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.groupService.searchNotUsers(term, this.groupId))
    ).subscribe(user => this.users = user);
  }
}
