import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Group } from '../../common/models/group';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';

import { MatDialog } from '@angular/material';
import { GroupService } from '../../common/services/group.service';
import { AuthService } from '../../common/services/auth.service';
import { PlansDisplayComponent } from '../plans-display/plans-display.component';
import { UsersDisplayComponent } from '../users-display/users-display.component';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  @Input() group: Group;
  mentor: User;
  isMentor = false;
  isInitialized = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  @ViewChild(PlansDisplayComponent)
  private plansDisplay: PlansDisplayComponent;

  ngOnInit() {
  }

  initialize(): void {
    if (!this.isInitialized) {
      this.userService.getUser(this.group.MentorId).subscribe((data: User) => this.mentor = data);
      if (this.authService.getUserRole() === 'Mentor') {
        this.isMentor = true;
      }
      this.plansDisplay.initialize();
      this.isInitialized = true;
    }
  }

}
