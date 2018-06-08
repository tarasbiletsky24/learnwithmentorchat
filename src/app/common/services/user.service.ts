import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Role } from '../models/role';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

   private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = `${environment.apiUrl}user`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError(this.handleError<User[]>(`getUsers`))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(`${this.url}/${user.Id}`, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUserById (id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles`).pipe(
      catchError(this.handleError<Role[]>('getRole'))
    );
  }

  search(param: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search?q=${param}`).pipe(
      catchError(this.handleError<User[]>(`searchUsers`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
