import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../common/models/task';
import { TaskService } from '../../common/services/task.service';
import { PlanService } from '../../common/services/plan.service';

@Component({
  selector: 'app-tasks-list-editor',
  templateUrl: './tasks-list-editor.component.html',
  styleUrls: ['./tasks-list-editor.component.css']
})
export class TasksListEditorComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() tasksInPlan: boolean;
  @Output() taskChange = new EventEmitter<Task>();
  constructor(private taskService: TaskService) { }

  ngOnInit() { 
  }
  onChange(task: Task): void {
    this.taskChange.emit(task);
    this.deleteFromArrey(task);
  }
  public addToArray(task: Task){
    this.tasks.push(task);
  }
  deleteFromArrey(task: Task) {
    const index: number = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
