import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { PlansDisplayComponent } from '../plans-display/plans-display.component';
import { UsersDisplayComponent } from '../users-display/users-display.component';
import { Group } from '../../../common/models/group';
import { UserService } from '../../../common/services/user.service';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-specific-group',
  templateUrl: './specific-group.component.html',
  styleUrls: ['./specific-group.component.css']
})

export class SpecificGroupComponent implements OnInit {
  @Input() group: Group;
  isInitialized = false;
  isMentor = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  @ViewChild(PlansDisplayComponent)
  private plansDisplay: PlansDisplayComponent;

  ngOnInit() { }

  initialize(): void {
    if (!this.isInitialized) {
      if (this.authService.isMentor()) {
        this.isMentor = true;
      }
      this.plansDisplay.initialize();
      this.isInitialized = true;
    }
  }

}
