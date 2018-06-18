import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = `${environment.apiUrl}plan`;

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.url).pipe(
      catchError(this.handleError<Plan[]>(`getPlans`))
    );
  }

  getPlan(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.url}/${id}`).pipe(
      catchError(this.handleError<Plan>(`getPlan id=${id}`))
    );
  }

  updatePlan(plan: Plan): Observable<any> {
    return this.http.put<Plan>(`${this.url}/${plan.Id}`, plan, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePlan'))
    );
  }

  addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.url, plan, this.httpOptions).pipe(
      catchError(this.handleError<Plan>('addPlan'))
    );
  }

  deletePlanById (id: number): Observable<Plan> {
    return this.http.delete<Plan>(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Plan>('deletePlan'))
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
