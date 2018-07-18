import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from '../../../common/services/group.service';
import { AlertWindowsComponent } from '../../../components/alert-windows/alert-windows.component';
import { Plan } from '../../../common/models/plan';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    public thisDialogRef: MatDialogRef<AddPlansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.groupId = data;
  }

  displayedColumns = ['Name', 'Description', 'Creator', 'CreateDate', 'Published', 'Check'];
  plans: Plan[];
  dataSource = new MatTableDataSource<Plan>(this.plans);
  private searchTerms = new Subject<string>();
  groupId: number;
  somePlanAdded = false;
  dataLoaded = false;
  errorMessage: string;
  errorMessageActive = false;
  searchActive = false;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.thisDialogRef.close(this.somePlanAdded);
  }

  addChoosenPlan(event: any, choosenOne: Plan) {
    this.groupService.addPlanToGroup(choosenOne.Id, this.groupId).subscribe();
    this.somePlanAdded = true;
    this.alertwindow.openSnackBar(choosenOne.Name + ' added', 'Ok');
    event.currentTarget.setAttribute('disabled', 'disabled');
  }

  activateErrorMessage(message: string): void {
    this.errorMessage = message;
    this.errorMessageActive = true;
  }

  search(term: string): void {
    this.searchActive = true;
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.thisDialogRef.disableClose = true;
    this.thisDialogRef.backdropClick().subscribe(result => {
      this.thisDialogRef.close(this.somePlanAdded);
    });
    this.groupService.searchNotPlans('', this.groupId).subscribe(
      data => {
        this.plans = data;
      },
      (error: HttpErrorResponse) => {
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        this.dataLoaded = true;
        if (this.plans === null || this.plans.length < 1) {
          this.activateErrorMessage('There are no more plans');
          this.dataSource = new MatTableDataSource<Plan>([]);
        } else {
          this.errorMessageActive = false;
          this.dataSource = new MatTableDataSource<Plan>(this.plans);
        }
      }
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.groupService.searchNotPlans(term, this.groupId))).subscribe(
        data => {
          this.plans = data;
          this.searchActive = false;
          if (this.plans === null || this.plans.length < 1) {
            this.activateErrorMessage('There are no plans by this key');
            this.dataSource = new MatTableDataSource<Plan>([]);
          } else {
            this.errorMessageActive = false;
            this.dataSource = new MatTableDataSource<Plan>(this.plans);
          }
        },
        (error: HttpErrorResponse) => {
          this.activateErrorMessage(error.error.Message);
          this.searchActive = false;
        }
      );
  }
}
