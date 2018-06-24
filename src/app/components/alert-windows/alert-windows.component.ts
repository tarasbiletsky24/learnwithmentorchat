import { Component, OnInit, Injectable , Inject} from '@angular/core';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'alert-windows.component',
  templateUrl: 'alert-windows.component.html',
  styleUrls: ['./alert-windows.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AlertWindowsComponent  implements OnInit {
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

