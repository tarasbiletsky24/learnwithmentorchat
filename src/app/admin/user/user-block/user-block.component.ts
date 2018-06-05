import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.css']
})
export class UserBlockComponent implements OnInit {



  roles: Role[];
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      u => this.users = u
    )
    this.userService.getRoles().subscribe(
      r => this.roles = r
    )
  }
}