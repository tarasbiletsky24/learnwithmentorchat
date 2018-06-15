import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
