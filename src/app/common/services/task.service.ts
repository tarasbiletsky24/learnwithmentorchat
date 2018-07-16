import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlanService } from './plan.service';
import { Plan } from '../models/plan';
import { UserTask } from '../models/userTask';
import { Message } from '../models/message';
import { text } from '@angular/core/src/render3/instructions';
import { StringifyOptions } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsObserve = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  // private url = '../assets/tasks.json';
  private url = `${environment.apiUrl}`;

  getTasks(planId?: number): Observable<Task[]> {
    if (planId != null) {
      return this.http.get<Task[]>(`${this.url}plan/${planId}/tasks`).pipe(
        catchError(this.handleError<Task[]>(`get Tasks for Plan`)));
    } else {
      return this.http.get<Task[]>(this.url + 'task').pipe(
        catchError(this.handleError<Task[]>(`get Tasks`)));
    }
  }


  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}task/${id}`).pipe(
      catchError(this.handleError<Task>(`getTask`)));
  }

  getTasksNotInPlan(id: number): Observable<Task[]> {

    return this.http.get<Task[]>(`${this.url}plan/${id}/tasks/notinplan`).pipe(
      catchError(this.handleError<Task[]>(`getTasks`)));
  }


  updateTask(task: Task): Observable<any> {
    const link = `${this.url}task/${task.Id}`;
    return this.http.put<Task>(link, task, httpOptions).pipe(
      catchError(this.handleError<Task>(`updating task id=${task.Id}`)));
  }

  deleteTask(task: Task): Observable<any> {
    const link = `${this.url}task/${task.Id}`;
    return this.http.delete<Task>(link, httpOptions).pipe(
      catchError(this.handleError<Task>(`deleting task id=${task.Id}`)));
  }

  createTask(task: Task, planId?: number): Observable<any> {
    let link = '';
    if (planId == null) {
      link = `${this.url}task`;
    } else {
      link = `${this.url}plan/${planId}/newTask`;
    }
    return this.http.post<Task>(link, task, httpOptions).pipe(
      catchError(this.handleError<Task>(`creating task`)));
  }

  getUserTask(planTaskId: number, userId: number): Observable<HttpResponse<UserTask>> {
    const link = `${this.url}task/usertask?planTaskId=${planTaskId}&userId=${userId}`;
    return this.http.get<UserTask>(link, { observe: 'response' }).pipe(
      catchError(val => of(val)));
  }

  getMessages(userTaskId: number): Observable<HttpResponse<Message[]>> {
    const link = `${this.url}task/userTask/${userTaskId}/messages`;
    return this.http.get<Message[]>(link, { observe: 'response' }).pipe(
      catchError(val => of(val)));
  }

  sendMessage(userTaskId: number, message: Message): Observable<any> {
    const link = `${this.url}task/userTask/${userTaskId}/messages`;
    return this.http.post<Message>(link, message, { observe: 'response' }).pipe(
      catchError(val => of(val)));
  }

  updateUserTaskResult(userTask: UserTask): Observable<any> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const link = `${this.url}task/usertask/result?userTaskId=${userTask.Id}`;
    return this.http.put<string>(link, userTask.Result as string, { headers: reqHeader }).pipe(
      catchError(val => of(val)));
  }

  search(param: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}task/search?key=${param}`).pipe(
      catchError(this.handleError<Task[]>(`searchTasks`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
