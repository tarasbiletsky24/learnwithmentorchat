import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../../common/services/task.service';
import { Image } from '../../common/models/image';
import { User } from '../../common/models/user';
import { AuthService } from '../../common/services/auth.service';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';
import { UserService } from '../../common/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from '../../common/services/group.service';
import { PlanService } from '../../common/services/plan.service';
import { UserTask } from '../../common/models/userTask';
import { Task } from '../../common/models/task';
import { TaskSubmitorComponent } from '../../task/task-submitor/task-submitor.component';
import { ConversationComponent } from '../../task/conversation/conversation.component';
import { UsersTasks } from '../../common/models/usersTasks';
import { UserWithImage } from '../../common/models/userWithImage';
import { Section } from '../../common/models/sections';
import { MatDialog } from '@angular/material';


export class UsersWithTasks {
  user: UserWithImage;
  image;
  usertasks: UserTask[];
}

@Component({
  selector: 'app-specific-plan',
  templateUrl: './specific-plan.component.html',
  styleUrls: ['./specific-plan.component.css']
})

export class SpecificPlanComponent implements OnInit {
  panelOpenState = false;
  is_student = true;
  sections: Section[];
  states: any;
  imageData = null;
  users: UsersWithTasks[] = null;
  user: UsersWithTasks = null;
  planTasks: number[];
  isLoadedUser = false;
  isLoadedUsers = false;
  constructor(public taskService: TaskService,
    private userService: UserService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private httpStatusCodeService: HttpStatusCodeService,
    private planService: PlanService,
    private groupservice: GroupService,
    private auth: AuthService,
    private router: Router) {
    this.users = new Array;
    this.planTasks = new Array;
    this.user = new UsersWithTasks;
  }

  sendState(i: number, event: any) {
    if (event.checked) {
      this.taskService.updateUserTaskState(event.source.id, 'D').subscribe(a => {
        this.sections[i].Content.UserTasks[this.sections[i].Content.UserTasks.findIndex(f => f.Id === event.source.id)].State = 'D';
        this.setUsertasks();
      });
    } else {
         this.taskService.updateUserTaskState(event.source.id, 'P').subscribe(a => {
            this.sections[i].Content.UserTasks[this.sections[i].Content.UserTasks.findIndex(f => f.Id === event.source.id)].State = 'P';
            this.setUsertasks();
      });
    }
  }

  sendResult(id: number, result: string) {
    this.taskService.updateTaskResult(id, result).subscribe();
  }

  accept(section: number, id: number){
    this.sections[section].Content.UserTasks[this.sections[section].Content.UserTasks.findIndex(f=>f.Id===id)].State = 'A';
        this.setUsertasks();
  }

  reject(section: number, id: number){
    this.sections[section].Content.UserTasks[this.sections[section].Content.UserTasks.findIndex(f=>f.Id===id)].State = 'R';
        this.setUsertasks();
  }

  onResultClick(task: Task) {
    const dialogRef = this.dialog.open(TaskSubmitorComponent, {data: task});
  }

  onConversationClick(task: Task) {
    const dialogRef = this.dialog.open(ConversationComponent, {data: task});
  }

  ngOnInit() {
    this.isLoadedUser = false;
    this.isLoadedUsers = false;
    const group_id = +this.router.url.split('/')[2];
    const plan_id = +this.router.url.split('/')[4];
    this.taskService.getTasksInSections(plan_id).subscribe(
      section => {
        this.sections = section;
        if (!this.auth.isStudent()) {
          this.is_student = false;
          this.groupservice.getGroupUsersWithImage(group_id).subscribe(
            result => {
              this.getUsersWithPictures(result);
            }
          );
        } else {
          this.is_student = true;
          this.userService.getUser().subscribe(u => {
            let userWithImage = this.toUserWithImage(u);
            this.getUserWithPictures(userWithImage);
          });
        }
      });
  }

  getPictureState(alluserState: UserTask[]): UserTask[] {
    for (const userState of alluserState) {
      if (userState.State.toLowerCase() === 'p') {
        userState.Image = '../../../assets/images/inprogress.png';
      } else
        if (userState.State.toLowerCase() === 'd') {
          userState.Image = '../../../assets/images/done.png';
        } else
          if (userState.State.toLowerCase() === 'a') {
            userState.Image = '../../../assets/images/approved.png';
          } else
            if (userState.State.toLowerCase() === 'r') {
              userState.Image = '../../../assets/images/rejected.png';
            } else userState.Image = '../../../assets/images/inprogress.png';
    }
    return alluserState;
  }

  getUsersWithPictures(groupUsers: UserWithImage[]) {
    this.planTasks = this.getPlantasks(this.sections);
    let userids: number[] = new Array;
    for (let user of groupUsers) {
      userids.push(user.Id);
    }
    this.getUsersTasks(userids, this.planTasks).subscribe(
      result_allUsertaskState => {
        for (let i = 0; i < groupUsers.length; i++) {
          let temp = new UsersWithTasks;
          temp.user = groupUsers[i];
          temp.image = this.setUserPic(groupUsers[i].Image);
          temp.usertasks = this.getPictureState(result_allUsertaskState[i].UserTasks);
          this.users.push(temp);
        }
        this.isLoadedUsers = true;
      }
    );
  }

  getUserWithPictures(user: UserWithImage) {
    this.planTasks = this.getPlantasks(this.sections);
    this.taskService.getUserTasks(user.Id, this.planTasks).subscribe(
      ut => {
        let usersTasks: UsersTasks = new UsersTasks;
        usersTasks.UserTasks = ut;
        debugger
        this.setUsertasksToSection(usersTasks);
        let temp = new UsersWithTasks;
        temp.user = user;
        temp.usertasks = this.getPictureState(ut);
        this.user = temp;
 
      }
    );
  }

  private getUsersTasks(ids: number[], planTasks: number[]): Observable<UsersTasks[]> {
    return this.taskService.getUsersTasksForGroupUsers(ids, planTasks);
  }

  private getPlantasks(sections: Section[]): number[] {
    let planTasks = new Array;
    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i].Content.Tasks.length; j++) {
        planTasks.push(sections[i].Content.Tasks[j].PlanTaskId);
      }
    }
    return planTasks;
  }
  
  selectedUserbyMentor(increased: UserTask[]) {
    this.setUsertasksToSection({ UserTasks: increased });
  }

  getUserTaskId(id: number): number {
    return this.user.usertasks[id].Id;
  }

  private isTaskDone(state: string): boolean {
    return state == 'D';
  }

  setUserPic(img: Image) {
    let image
    if (typeof img.Base64Data != 'undefined' && typeof img.Name != 'undefined') {
      const extension = img.Name.split('.').pop().toLowerCase();
      const imgUrl = `data:image/${extension};base64,${img.Base64Data}`;
      image = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    }
    else {
      image = '../../../assets/images/user-default.png';
    }
    return image;
  }

  private setUsertasksToSection(usersTasks: UsersTasks) {
    let index = 0;
    for (let i = 0; i < this.sections.length; i++) {
      this.sections[i].Content.UserTasks = new Array;
      for (let j = 0; j < this.sections[i].Content.Tasks.length; j++) {
        this.sections[i].Content.UserTasks.push(usersTasks.UserTasks[index + j]);
      }
      index += this.sections[i].Content.Tasks.length;
    }
    debugger
    this.isLoadedUser = true;
    //???????????????
    //this.setUsertasks();
  }

  private setUsertasks() {
    // test
   // this.sections[0].Content.UserTasks[0].State = 'R';
    // test
    let tasks: UserTask[] = new Array;
    for (let i = 0; i < this.sections.length; i++) {
      for (let j = 0; j < this.sections[i].Content.Tasks.length; j++) {
        tasks.push(this.sections[i].Content.UserTasks[j]);
      }
    }
    this.users[this.users.findIndex(k => k.user.Id === tasks[0].UserId)].usertasks = this.getPictureState(tasks);
  }

  private toUserWithImage(user: User): UserWithImage{
    let userWithImage = new UserWithImage;
    userWithImage.Id = user.Id;
    userWithImage.Role = user.Role;
    userWithImage.LastName = user.LastName;
    userWithImage.FirstName = user.FirstName;
    userWithImage.Email = user.Email;
    userWithImage.Blocked = user.Blocked;
    return userWithImage;
  }
}
