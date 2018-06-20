import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SignupComponent>) { }

  closeSignupComponent(): void {
    this.thisDialogRef.close();
  }
  ngOnInit() {
  }

}
