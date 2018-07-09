import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {

  task: Task;
  @Input()
  planId: number;
  @Input()
  tasks: Task[];
  constructor(private taskService: TaskService, private authService: AuthService) { }

  onSaveClick(name: string, description: string) {
    this.task = new Task();
    this.task.Description = description;
    this.task.Name = name;
    // todo:
    // you need to change to real user Id
    this.task.CreatorId = this.authService.getUserId(); // here
    if (this.planId == null) {
      this.taskService.createTask(this.task).subscribe();
    } else {
      this.taskService.createTask(this.task, this.planId).subscribe();
      this.tasks.push(this.task);
    }
  }
  ngOnInit() {
  }
}
