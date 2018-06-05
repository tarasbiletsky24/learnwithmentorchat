import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';
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
  roles: Role[];
  users: User[];
  private searchTerms = new Subject<string>();
  constructor(private userService: UserService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      r => this.roles = r
    );
    this.userService.getUsers().subscribe(
      u => this.users = u
    )
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.userService.search(term))
    ).subscribe(u => this.users = u);
  }
}
