import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import { MatDialog } from '@angular/material';
import { GroupService } from '../../common/services/group.service';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  @Input() group: Group;
  mentor: User;
  isMentor = false;

  constructor(private userService: UserService,
    public dialog: MatDialog) {  }

  ngOnInit() {
    this.userService.getUser(this.group.MentorId).subscribe((data: User) => this.mentor = data);
    if (localStorage.getItem('role') === 'Mentor') {
      this.isMentor = true;
    }
  }
}
