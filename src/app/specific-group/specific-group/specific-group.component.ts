import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import { MatDialog } from '@angular/material';
import { GroupService } from '../../common/services/group.service';
import { TasksComponent } from '../../task/tasks/tasks.component';

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
    if (this.linkId != null) {
      this.groupService.getGroup(this.linkId).subscribe((data: Group) => this.group = data);
      this.userService.getUser(this.linkId).subscribe((data: User) => this.mentor = data);
    } else {
      this.router.navigate(['/main-page']);
    };
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TasksComponent, {
      width: '800px',
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //todo reinit tables
    });
  }

}
