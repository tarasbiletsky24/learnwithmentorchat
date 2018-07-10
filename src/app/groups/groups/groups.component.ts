import { Component, OnInit, Inject, Attribute } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatButton, MatDialog, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AuthService } from '../../common/services/auth.service';

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
      data => this.groups = data,
      error => {this.errorMessage = error.message;},
      () => { this.dataLoaded = true; }
    );
  }

  expandPanel(element: any): void {
    element.setAttribute('background-color', 'gainsboro');
  }
}
