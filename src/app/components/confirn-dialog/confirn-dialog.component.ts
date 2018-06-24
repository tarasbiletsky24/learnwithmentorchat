import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirn-dialog',
  templateUrl: './confirn-dialog.component.html',
  styleUrls: ['./confirn-dialog.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ConfirnDialogComponent implements OnInit {

statee:boolean;
  ngOnInit() {
  }
  constructor(public dialog: MatDialog){}

getconfirm(question:string): boolean{
this.openDialog(question);
window.alert('@@@'+this.statee);
return this.statee;
}
  openDialog(question:string): void {
      let dialogReff = this.dialog.open(DialogOverviewExampleDialog, {
        data:{name: question, state:false},
      width: '550px'
    });
    dialogReff.afterClosed().subscribe(result => {
      
      this.statee = result;
      window.alert(this.statee);
      
    });
    window.alert('!!!!!'+this.statee);
    

  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick():void{
   this.data.state= false;
    this.dialogRef.close();
}


}

