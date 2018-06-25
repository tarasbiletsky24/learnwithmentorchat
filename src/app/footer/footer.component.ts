import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {AboutPageComponent} from '../main-page/about-page/about-page.component';
import {ContactPageComponent} from '../main-page/contact-page/contact-page.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  mainTag = '</>';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAboutDialog() {
    const dialogRef = this.dialog.open(AboutPageComponent, {});
  }

  openContactDialog() {
    const dialogRef = this.dialog.open(ContactPageComponent, {});
  }

}
