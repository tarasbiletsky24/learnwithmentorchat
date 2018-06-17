import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  // private url = '../assets/tasks.json';
  private url = `${environment.apiUrl}task`;

  getTasks() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError<Task[]>(`getTasks`)));
  }
  getTask(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(this.handleError<Task>(`getTask`)));
  }
  updateTask(task: Task): Observable<any> {        
    let link = `${this.url}/${task.Id}`;
    return this.http.put<Task>(link, task, httpOptions).pipe(
      catchError(this.handleError<Task>(`updating task id=${task.Id}`)));
  }
  deleteTask(task: Task): Observable<any> {    
    let link = `${this.url}/${task.Id}`;
    return this.http.delete<Task>(link, httpOptions).pipe(
      catchError(this.handleError<Task>(`deleting task id=${task.Id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
