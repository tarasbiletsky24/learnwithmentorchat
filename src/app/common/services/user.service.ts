import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Role } from '../models/role';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { HttpResponse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  roleName: string;
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

  getUser(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUserByRole_id(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/inrole/${id}`).pipe(
      catchError(this.handleError<User[]>(`getUserbyrole`))
    );
  }

  updateUser(user: User): Observable<HttpResponse<any>> {
    return this.http.put(`${this.url}/${user.Id}`, user).pipe(
      catchError(r => of(r))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  blockUserById(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles`).pipe(
      catchError(this.handleError<Role[]>('getRole'))
    );
  }

  userAuthentication(email, password) {
    const data = 'email=' + email + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }

  search(param: string, roleName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search?q=${param}&role=${roleName}`).pipe(
      catchError(this.handleError<User[]>(`searchUsers`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
