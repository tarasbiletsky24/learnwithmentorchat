import { Input, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersWithTasks } from '../../specific-group/specific-plan/specific-plan.component';
import { UserTask } from '../../common/models/userTask';

@Component({
  selector: 'app-specific-plan-for-mentor',
  templateUrl: './specific-plan-for-mentor.component.html',
  styleUrls: ['./specific-plan-for-mentor.component.css']
})
export class SpecificPlanForMentorComponent implements OnInit {

  @Input() users: UsersWithTasks[];
  @Output() selectedUser = new EventEmitter<number>();
  @Input() isLoadedUsers: boolean;
  ischeck: number;
  selectUser(index: number) {
    this.ischeck=index;
    this.selectedUser.emit(index);
  }
  ischecked(k:number):boolean{
    if  (this.ischeck=== undefined && k===0){ return true; }
    return k === this.ischeck ? true : false;
  }

  
  constructor() {
  }

  ngOnInit() {
  }
}
