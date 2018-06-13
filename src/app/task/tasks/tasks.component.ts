import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../common/services/task.service';
import { Task } from '../../common/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;
  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  ngOnInit() {
  }
  onSelect(task: Task): void {
    this.selectedTask = task;
  }
}
