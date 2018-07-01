import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Plan } from '../../common/models/plan';
import { GroupService } from '../../common/services/group.service';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.groupId = data;
  }

  displayedColumns = ['Name', 'Description', 'Creator', 'CreateDate', 'Published', 'Check'];
  plans: Plan[];
  dataSource = new MatTableDataSource<Plan>(this.plans);
  private searchTerms = new Subject<string>();
  groupId: number;

  addChoosenPlan(choosenOne: Plan) {
    this.groupService.addPlanToGroup(choosenOne.Id, this.groupId).subscribe();
    this.alertwindow.openSnackBar(choosenOne.Name + ' added', 'Ok');
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.groupService.searchNotPlans("", this.groupId).subscribe(
      plan => this.plans = plan
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.groupService.searchNotPlans(term, this.groupId))
    ).subscribe(plan => this.plans = plan);
  }
}
