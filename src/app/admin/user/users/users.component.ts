import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';
import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {AlertWindowsComponent} from '../../../components/alert-windows/alert-windows.component';
import {ConfirnDialogComponent} from '../../../components/confirn-dialog/confirn-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor( private userService: UserService,  private  alertwindow: AlertWindowsComponent , private confirDialog: ConfirnDialogComponent) {
  }

  displayedColumns = ['Check', 'FirstName', 'LastName', 'Role', 'Blocked'];
  roles: Role[];
  users: User[];
  name: string;
  surname: string;
  role: string;
  state: boolean;
  newState: boolean;
  id: number;
  forMessage: string;
  selectedType: Role;
  roleName: string = null;
  dataSource = new MatTableDataSource<User>(this.users);
  private searchTerms = new Subject<string>();

  getType(roleName: string, type: Role): string {
    this.selectedType = type;
    return this.roleName = roleName;
  }

  // choose specific user
  chooseUser(id: number, role: string, name: string, surname: string, state: boolean) {
    this.surname = surname;
    this.name = name;
    this.state = state;
    this.id = id;
  }

  // search by role
  search(term: string, roleName: string): void {
    this.searchTerms.next(term);
  }

  getRole(role: string) {
    return this.role = role;
  }

  // changeState:blocked and active
  changeState(id: number, state: boolean, newState) {
    if (this.id == null || state == null) {
    this.alertwindow.openSnackBar('Choose user!','Ok'); // window.alert('Choose user');
      return false;
    }
    if (newState) {
      this.forMessage = ' block ';
    }
    if (!newState) {
      this.forMessage = ' unblock ';
    }
    if (this.state === newState) {
      window.alert('User ' + this.name + ' ' + this.surname + ' already' + this.forMessage);
      return false;
    }
    const user = { Blocked: newState, Id: this.id };
    if (this.confirDialog.getconfirm('Are sure you want to ' + this.forMessage + ' user : ' + this.name + ' ' + this.surname + '  ?')) {
      this.userService.updateUser(user as User).subscribe();
      this.users.forEach(element => {
        if (element.Id === id) {
          element.Blocked = newState;
        }
      });
      this.state = newState;
      return true;
    }
  }

  // change role for user
  updateRole(id: number, role: string, name: string, surname: string) {
    if (this.confirDialog.getconfirm('Are sure you want to update role for user : ' + name + ' ' + surname + ' on role: "' + role + '" ?')) {
      const user = { Role: role, Id: id };
      this.userService.updateUser(user as User).subscribe();
      this.users.forEach(element => {
        if (element.Id === id) {
          element.Role = role;
        }
      });
    }
  }

  // filtering by role
  getByRole(id: number) {
    if (id === -1) {
      this.userService.getUsers().subscribe(user => this.users = user);
      return true;
    }
    this.userService.getUserByRole_id(id).subscribe(user => this.users = user);
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      role => this.roles = role);

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
