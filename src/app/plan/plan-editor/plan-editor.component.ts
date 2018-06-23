import { Component, OnInit, Input, Inject } from '@angular/core';
import { Plan } from '../../common/models/plan';
import { PlanService } from '../../common/services/plan.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {

  @Input()
  plan: Plan;
  constructor(public dialogRef: MatDialogRef<PlanEditorComponent>,
    private planService: PlanService,
    @Inject(MAT_DIALOG_DATA) public data: Plan) { this.plan = data; }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(description: string) {   
    //todo: 
  }
  onDeleteClick() {  
    //todo:   
  }
}
