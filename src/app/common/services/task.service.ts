import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlanService } from './plan.service';
import { Plan } from '../models/plan';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  // private url = '../assets/tasks.json';
  private url = `${environment.apiUrl}`;

  getTasks(planId?: number): Observable<Task[]> {
    if (planId) {
      return this.http.get<Task[]>(`${this.url}/plan/${planId}/tasks`).pipe(
        catchError(this.handleError<Task[]>(`get Tasks for Plan`)));
    }
    return this.http.get<Task[]>(this.url + 'task').pipe(
      catchError(this.handleError<Task[]>(`get Tasks`)));
  }
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}task/${id}`).pipe(
      catchError(this.handleError<Task>(`getTask`)));
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
  createTask(task: Task): Observable<any> {
   const link = `${this.url}task`;
    return this.http.post<Task>(link, task, httpOptions).pipe(
      catchError(this.handleError<Task>(`creating task`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
