import { Component, OnInit, Input, Inject } from '@angular/core';
import { Task } from '../../common/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../common/services/task.service';
import { UserTask } from '../../common/models/userTask';
import { Message } from '../../common/models/message';
import { Observable, of } from 'rxjs';
import {AlertWindowsComponent} from '../../components/alert-windows/alert-windows.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input()
  task: Task;
  private userTask: UserTask;
  private messages: Message[];
  private notExistingMessage: string;
  private userMessage: string;
  private recentMessages: Message[] = [];
  // todo: add logic for getting user id from local storage if authorized
  private userId = 4;

  constructor(public dialogRef: MatDialogRef<ConversationComponent>, private  alertwindow: AlertWindowsComponent,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.task = data;
  }

  notExistingUserTask() {
    this.dialogRef.close();
    this.alertwindow.openSnackBar('You are not asigned to this plan!' , 'Ok');
  }

  getUTMessages(userTaskId: number) {
    this.taskService.getMessages(userTaskId).subscribe(
      mes => {
        if (mes.body.length === 0) {
          this.notExistingMessage = 'Your conversation with mentor is empty. ' +
            'Ask some questions, if you have any.';
        } else {
          this.messages = mes.body;
        }
      }
    );
  }

   onSendClick() {
    if (this.userMessage !== '' && this.userMessage) {
      const mes = { Text: this.userMessage, SenderId: this.userId };
      this.taskService.sendMessage(this.userTask.Id, mes as Message).subscribe(
        resp => {
          if (resp.ok) {
            this.recentMessages.push(mes as Message);
            this.notExistingMessage = '';
          } else {
            this.alertwindow.openSnackBar('Your message is too long!' , 'Ok');
          }
        }
      );
    }
    this.userMessage = '';
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.onSendClick();
      this.userMessage = '';
    }
  }


  ngOnInit() {

    this.taskService.getUserTask(this.task.PlanTaskId, this.userId).subscribe(
      ut => {
        if (ut.status !== 200) {
          this.notExistingUserTask();
        } else {
          this.userTask = ut.body;
          this.getUTMessages(this.userTask.Id);
        }
      }
    );
  }

}
