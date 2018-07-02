import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private httpOptionsNoAuth = {
    headers: new HttpHeaders({ 'No-Auth': 'True' })
  };

  private url = `${environment.apiUrl}plan`;

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.url).pipe(
      catchError(this.handleError<Plan[]>(`getPlans`))
    );
  }

  getSomePlans(previousAmount: number, amount: number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.url}/some?prevAmount=${previousAmount}&amount=${amount}`, { headers: new HttpHeaders({ 'No-Auth': 'True' }) }).pipe(
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

  deletePlanById(id: number): Observable<Plan> {
    return this.http.delete<Plan>(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Plan>('deletePlan'))
    );
  }

  updateImage(id: number, file: File) {
    const fd = new FormData;
    fd.append('image', file, file.name);
    return this.http.post(`${this.url}/${id}/image`, fd, { observe: 'response' }).pipe(
      catchError(val => of(val)));
  }

  getImage(id: number): Observable<HttpResponse<Image>> {
    return this.http.get(`${this.url}/${id}/image`, {
      observe: 'response',
      headers: new HttpHeaders({ 'No-Auth': 'True' })
    }).pipe(
      catchError(val => of(val)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
