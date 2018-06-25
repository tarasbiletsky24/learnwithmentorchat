import { Component, OnInit, Input, Inject } from '@angular/core';
import { Plan } from '../../common/models/plan';
import { PlanService } from '../../common/services/plan.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../common/models/task';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {
  tasksInPlan: Task[];
  tasksNotInPlan: Task[];
  @Input()
  plan: Plan;
  constructor(public dialogRef: MatDialogRef<PlanEditorComponent>,
    private planService: PlanService, private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Plan) { this.plan = data; }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onTaskChange(tasksInPlan: boolean, task: Task) {
    if (tasksInPlan) {
      this.tasksInPlan.push(task);
      this.deleteFromArrey(task, this.tasksNotInPlan);
    } else {
      this.tasksNotInPlan.push(task);
      this.deleteFromArrey(task, this.tasksInPlan);
    }
  }
  deleteFromArrey(task: Task, tasks: Task[]) {
    const index: number = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
  }
  onSaveClick(description: string) {
    //todo: 
  }
  onDeleteClick() {
    //todo:   
  }
}
