import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';
import { Plan } from '../../common/models/plan';

import { MatDialog } from '@angular/material';
import { GroupService } from '../../common/services/group.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { PlansDisplayComponent } from '../plans-display/plans-display.component';
import { UsersDisplayComponent } from '../users-display/users-display.component';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  group: Group;
  mentor: User;
  linkId: number;

  //todo should be private, but does not work
  /*private*/ subscription: Subscription;

  constructor(private userService: UserService,
    private groupService: GroupService,
    public dialog: MatDialog, 
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => this.linkId = params['id']);
  }

  ngOnInit() {
    if (this.linkId !== null) {
      //mb move to constructor
      this.groupService.getGroup(this.linkId).subscribe((data: Group) => this.group = data);
      this.userService.getUser(this.linkId).subscribe((data: User) => this.mentor = data);
    } else {
      // todo does it work?
      this.router.navigate(['main-page']);
    }
  }

}
