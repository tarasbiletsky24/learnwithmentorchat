import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from '../../../common/services/group.service';
import { AlertWindowsComponent } from '../../../components/alert-windows/alert-windows.component';
import { User } from '../../../common/models/user';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { HttpStatusCodeService } from '../../../common/services/http-status-code.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  constructor(private groupService: GroupService,
    private alertwindow: AlertWindowsComponent,
    public thisDialogRef: MatDialogRef<AddUsersComponent>,
    private httpStatusCodeService: HttpStatusCodeService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.groupId = data;
  }

  displayedColumns = ['Name', 'Email', 'Role', 'Blocked', 'Button'];
  users: User[];
  dataSource = new MatTableDataSource<User>(this.users);
  private searchTerms = new Subject<string>();
  groupId: number;
  someUserAdded = false;
  dataLoaded = false;
  errorMessage: string;
  errorMessageActive = false;
  searchActive = false;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.thisDialogRef.close(this.someUserAdded);
  }

  addChoosenUser(event: any, choosenOne: User) {
    const target = event.currentTarget;
    target.disabled = true;
    this.groupService.addUserToGroup(choosenOne.Id, this.groupId).subscribe(
      resp => {
        if (this.httpStatusCodeService.isOk(resp.status)) {
          this.someUserAdded = true;
          this.alertwindow.openSnackBar(choosenOne.FirstName + ' ' + choosenOne.LastName + ' added', 'Ok');
        }
      },
      error => {
        target.disabled = false;
        this.alertwindow.openSnackBar('Error ocurred on adding: ' + choosenOne.LastName + ' '
        + choosenOne.FirstName + ', please try again', 'Ok');
      }
    );
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
      this.thisDialogRef.close(this.someUserAdded);
    });
    this.groupService.searchNotUsers('', this.groupId).subscribe(
      data => {
        this.users = data;
      },
      (error: HttpErrorResponse) => {
        this.activateErrorMessage(error.error.Message);
        this.dataLoaded = true;
      },
      () => {
        this.dataLoaded = true;
        if (!this.users || this.users.length < 1) {
          this.activateErrorMessage('There are no more users');
          this.dataSource = new MatTableDataSource<User>([]);
        } else {
          this.errorMessageActive = false;
          this.dataSource = new MatTableDataSource<User>(this.users);
        }
      }
    );
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.groupService.searchNotUsers(term, this.groupId))).subscribe(
        data => {
          this.users = data;
          this.searchActive = false;
          if (!this.users || this.users.length < 1) {
            this.activateErrorMessage('There are no users by this key');
            this.dataSource = new MatTableDataSource<User>([]);
          } else {
            this.errorMessageActive = false;
            this.dataSource = new MatTableDataSource<User>(this.users);
          }
        },
        (error: HttpErrorResponse) => {
          this.activateErrorMessage(error.error.Message);
          this.searchActive = false;
        }
      );
  }
}
