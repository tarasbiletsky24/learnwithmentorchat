import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { Group } from '../models/group';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = `${environment.apiUrl}group`;

  getGroup(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }

  getGroupUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/users`).pipe(
      catchError(this.handleError<User[]>(`getGroupUsers`))
    );
  }

  getUserGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.url}/mygroups`).pipe( );
  }

  getGroupPlans(id: number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.url}/${id}/plans`).pipe(
      catchError(this.handleError<Plan[]>(`getGroupPlans`))
    );
  }

  searchNotUsers(param: string, groupId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/searchinNotInvolvedUsers?searchKey=${param}&groupId=${groupId}`).pipe(
      catchError(this.handleError<User[]>(`searchUsersNotInGroup`))
    );
  }

  searchNotPlans(param: string, groupId: number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.url}/searchinNotUsedPlan?searchKey=${param}&groupId=${groupId}`).pipe(
      catchError(this.handleError<Plan[]>(`searchPlansNotInGroup`))
    );
  }

  addUserToGroup(userId: number, groupId: number): Observable<HttpResponse<any>> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.url}/${groupId}/user`, [userId],{ observe: 'response', headers: reqHeader }).pipe(
    );
  }

  addPlanToGroup(planId: number, groupId: number): Observable<HttpResponse<any>> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.url}/${groupId}/plan`, [planId], { observe: 'response', headers: reqHeader }).pipe(
    );
  }

  removePlanFromGroup(groupId: number, planId: number): Observable<Plan> {
    return this.http.delete<Plan>(`${this.url}/removePlanFromGroup?groupId=${groupId}&planToRemoveId=${planId}`, this.httpOptions).pipe(
      catchError(this.handleError<Plan>('deleteComment'))
    );
  }

  removeUserFromGroup(groupId: number, userId: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/removeUserFromGroup?groupId=${groupId}&userToRemoveId=${userId}`, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteComment'))
    );
  }

  createGroup(group: Group): Observable<HttpResponse<any>> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.url}`, group, { observe: 'response', headers: reqHeader }).pipe(
      // catchError(r => of(r))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // todo put into sharable service
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
