import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  roles: Role[];
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      u => this.users = u
    );
    this.userService.getRoles().subscribe(
      r => this.roles = r
    );
  }
}
