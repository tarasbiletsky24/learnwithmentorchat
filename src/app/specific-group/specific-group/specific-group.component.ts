import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  group: Group;
  mentor: User;
  id: number;
  //todo should be private, but does not work
  /*private*/ subscription: Subscription;

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.group = {
      Id: this.id,
      Name: 'LV319.NET',
      MentorId: 1
    };
    this.userService.getUser(this.group.MentorId).subscribe((data: User) => {
      this.mentor = data;
    });
  }

  /* openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskEditorComponent, {
      data: this.task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.task = result;
      // send to API
    });
  } */

}
