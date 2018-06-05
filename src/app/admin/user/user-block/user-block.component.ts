import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.css']
})
export class UserBlockComponent implements OnInit {



  roles: Role[];
  users: User[];
  private searchTerms = new Subject<string>();
  constructor(private userService: UserService) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit() {
    this.userService.getUsers().subscribe(
      u => this.users = u
    )
    this.userService.getRoles().subscribe(
      r => this.roles = r
    )
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.userService.search(term))
    ).subscribe(u => this.users = u);
  }
  }
