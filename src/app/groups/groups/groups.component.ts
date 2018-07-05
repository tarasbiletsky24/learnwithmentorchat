import { Component, OnInit, Inject, Attribute } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatButton } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Group } from '../../common/models/group';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
    private router: Router) { }

  displayedColumns = ['Name', 'MentorId', 'Link'];
  groups: Group[];
  dataSource = new MatTableDataSource<Group>(this.groups);
  userId: number;

  ngOnInit() { 
    this.userId =parseInt(localStorage.getItem('id')); 
    this.groupService.getUserGroups(this.userId).subscribe(
      data => this.groups = data
    );
  }

  goToGroup(choosenGroup: Group) {
    this.router.navigate(['group',choosenGroup.Id]);
  }

}
