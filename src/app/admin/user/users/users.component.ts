import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';
import { MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  displayedColumns = ['Check', 'FirstName', 'LastName', 'Role', 'Blocked'];
  roles: Role[];
  users: User[];
  user: User;
  name: string;
  surname: string;
  role: string;
  blocked: boolean;
  id: number;
  selectedType: Role;
  roleName: string = null;
  isMarked = false;
  dataSource = new MatTableDataSource<User>(this.users);
  private searchTerms = new Subject<string>();

  getType(roleName: string): string {
    return this.roleName = roleName;
  }

  chooseUser(id: number, role: string, name: string, surname: string): number {

    this.surname = surname;
    this.name = name;
    return this.id = id;
  }
  onSelect(r:number){
    this.userService.getUserByRole_id(r).subscribe(
      u => this.users = u
    );
  }


  constructor(private userService: UserService) {

  }

  search(term: string, roleName: string): void {
    this.searchTerms.next(term);
  }

  getRole(role: string) {
    console.log(role);
    return this.role = role;
  }

  updateRole(id: number, role: string, name: string, surname: string) {
    if (window.confirm('Are sure you want to update role for user : ' + name + ' ' + surname + ' on role: "' + role + '" ?')) {
      const u = { Role: role, Id: id };
      this.userService.updateUser(u as User).subscribe();
      this.users.forEach(element => {
        if (element.Id === id) {
          element.Role = role;
        }
      });
    }
  }

  blockUser(id: number, name: string, surname: string) {
    if (window.confirm('Are sure you want to block ' + name + ' ' + surname + ' ?')) {
      this.userService.blockUserById(id).subscribe();
      this.users.forEach(element => {
        if (element.Id === id) {
          element.Blocked = true;
        }
      });
    }
  }

  unblockUser(id: number, name: string, surname: string) {
    this.blocked = false;
    if (window.confirm('Are sure you want to unblock  user : ' + name + ' ' + surname + ' ?')) {
      const u = { Blocked: false, Id: id };
      this.userService.updateUser(u as User).subscribe();
      this.users.forEach(element => {
        if (element.Id === id) {
          element.Blocked = false;
        }
      });
    }
  }

  getByRole(id: number) {
    if (id === -1) {
      this.userService.getUsers().subscribe(u => this.users = u);
    }
      this.userService.getUserByRole_id(id).subscribe(u => this.users = u);
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      r => this.roles = r);

    this.userService.getUsers().subscribe(
    u => this.users = u
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.search(term, this.roleName))
    ).subscribe(u => this.users = u);
  }
}
