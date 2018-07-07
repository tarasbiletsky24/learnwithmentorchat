import { Component, OnInit, Inject, Attribute } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatButton, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { Router } from '@angular/router';
import { AddPlansComponent } from '../../specific-group/add-plans/add-plans.component';
import { Plan } from '../../common/models/plan';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
    public dialog: MatDialog) { }

  groups: Group[];
  userId: number;

  ngOnInit() { 
    this.userId =parseInt(localStorage.getItem('id')); 
    this.groupService.getUserGroups(this.userId).subscribe(
      data => this.groups = data
    );
  }
}
