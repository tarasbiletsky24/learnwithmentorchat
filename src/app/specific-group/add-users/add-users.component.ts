import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { User } from '../../common/models/user';
import { Role } from '../../common/models/role';
import { UserService } from '../../common/services/user.service';
import { GroupService } from '../../common/services/group.service';
import { DialogsService } from '../../components/dialogs/dialogs.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  constructor(private userService: UserService,
    private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    private dialogsService: DialogsService) { }

  displayedColumns = ['FirstName', 'LastName', 'Role', 'Blocked', 'Check'];
  roles: Role[];
  users: User[];
  email: string;
  name: string;
  surname: string;
  role: string;
  state: boolean;
  newState: boolean;
  id: number;
  forMessage: string;
  selectedType: Role;
  selectedState: boolean;
  roleName: string = null;
  public result: any;
  dataSource = new MatTableDataSource<User>(this.users);
  private searchTerms = new Subject<string>();
  
  //@Input()
  groupId: number = 1;

  // choose specific user
  addChooseUser(choosenOne: User) {
    this.groupService.addUserToGroup(choosenOne.Id, this.groupId).subscribe();
    console.log("user added");
  }
  // search by role
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      user => this.users = user
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.search(term, this.roleName))
    ).subscribe(user => this.users = user);
  }

}
