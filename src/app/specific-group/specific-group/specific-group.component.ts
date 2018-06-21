import { Component, OnInit } from '@angular/core';

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  group: Group;
  mentor: User;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.group = {
      Id: 1,
      Name: 'LV319.NET',
      MentorId: 1
    };
    this.userService.getUser(this.group.MentorId).subscribe((data: User) => {
      this.mentor = data;
    });
  }

}
