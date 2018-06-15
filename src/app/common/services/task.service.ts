import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';

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
    return this.http.get(this.url);
  }
  getTask(id: number) {
    return this.http.get('${this.url}/${id}');
  }
  updateTask (task: Task): Observable<any> {
    debugger
    return this.http.put(this.url+task.Id, task, httpOptions).pipe(
      tap(_ => console.log(`updated task id=${task.Id}`))
    );
  }
}
