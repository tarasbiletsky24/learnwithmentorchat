import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AuthService } from '../../common/services/auth.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { SpecificGroupComponent } from '../../specific-group/specific-group/specific-group.component';

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
  userId: number;
  userName: string;
  isMentor = false;
  dataLoaded: boolean;
  errorMessage: string;
  errorMessageActive: boolean = false;

  //@ViewChild(SpecificGroupComponent)
  //private specificGroup: SpecificGroupComponent;

  @ViewChildren(SpecificGroupComponent) 
  specificGroupList: QueryList<SpecificGroupComponent>;

  ngOnInit() {
    this.dataLoaded = false;
    this.userId = this.authService.getUserId();
    if (this.authService.getUserRole() === 'Mentor') {
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
      this.dataLoaded = false;
      this.loadUserGroups();
    }
    );
  }

  loadUserGroups(): void {
    this.groupService.getUserGroups(this.userId).subscribe(
      data => {
        this.groups = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.Message;
        this.errorMessageActive = true;
        this.dataLoaded = true;
      },
      () => {
        this.dataLoaded = true;
        if (this.groups === null ) {
          this.errorMessage = 'There are no groups for you';
          this.errorMessageActive = true;
        } 
      }
    );
  }

  expandPanel(element: any, group: Group): void {
    element.setAttribute('background-color', 'gainsboro');
    this.specificGroupList.find(x => x.group === group).initialize();//fix
  }
}
