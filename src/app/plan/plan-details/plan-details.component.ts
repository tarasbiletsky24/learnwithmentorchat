import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '../../common/models/plan';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {

  @Input()
  plan: Plan;
  constructor() { }

  ngOnInit() {
  }

}
