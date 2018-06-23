import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import { MatDialog } from '@angular/material';
import { GroupService } from '../../common/services/group.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Plan } from '../../common/models/plan';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  group: Group;
  mentor: User;
  linkId: number;
  users: User[];
  plans: Plan[];
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
    if (this.linkId != null) {
      //mb move to constructor
      this.groupService.getGroup(this.linkId).subscribe((data: Group) => this.group = data);
      this.userService.getUser(this.linkId).subscribe((data: User) => this.mentor = data);
      this.groupService.getGroupUsers(this.linkId).subscribe(data => this.users = data);
      this.groupService.getGroupPlans(this.linkId).subscribe(data => this.plans = data);
    } else {
      this.router.navigate(['/main-page']);
    };
  }

  openPlanAddDialog(): void {
    const dialogRef = this.dialog.open(/*AddPlanComponent*/AddUserComponent, {
      width: '800px',
      data: this.group.Id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //todo reinit table plans
    });
  }

  openUserAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '800px',
      data: this.group.Id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //todo reinit table users
    });
  }

}
