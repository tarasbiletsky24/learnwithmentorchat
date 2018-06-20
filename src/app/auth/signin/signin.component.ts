import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SigninComponent>) { }

  closeSigninComponent(): void {
    this.thisDialogRef.close();
  }
  ngOnInit() {
  }

}
