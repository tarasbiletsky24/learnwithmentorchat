import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AuthService } from '../../common/services/auth.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { SpecificGroupComponent } from '../../specific-group/specific-group/specific-group.component';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  groups: Group[];
  userName: string;
  isMentor = false;
  dataLoaded: boolean;
  errorMessage: string;
  errorMessageActive = false;

  @ViewChildren(SpecificGroupComponent)
  specificGroupList: QueryList<SpecificGroupComponent>;

  ngOnInit() {
    this.dataLoaded = false;
    if (this.authService.isMentor()) {
      this.isMentor = true;
    }
    this.userName = this.authService.getUserFullName();
    this.loadUserGroups();
  }

  openGroupCreateDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataLoaded = false;
        this.loadUserGroups();
      }
    }
    );
  }

  loadUserGroups(): void {
    this.groupService.getUserGroups(this.authService.getUserId()).subscribe(
      data => {
        this.groups = data;
      },
      (error: HttpErrorResponse) => {
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        this.dataLoaded = true;
        if (this.groups === null) {
          this.activateErrorMessage('There are no groups for you');
        }
      }
    );
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  expandPanel(element: any, group: Group): void {
    element.setAttribute('background-color', 'gainsboro');
    this.specificGroupList.find(x => x.group === group).initialize(); // fix
  }
}
