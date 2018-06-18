import { Component, OnInit, Optional } from '@angular/core';
import { TaskService } from '../../common/services/task.service';
import { Task } from '../../common/models/task';
import { Plan } from '../../common/models/plan';
import { PlanService } from '../../common/services/plan.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;
  plan: Plan;
  constructor(private taskService: TaskService, private planService: PlanService, @Optional() public planId: number) {
    if (planId != null) {
      this.planService.getPlan(planId).subscribe((u: Plan) => this.plan = u);
      this.taskService.getTasks(planId).subscribe((data: Task[]) => this.tasks = data);
    }
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
