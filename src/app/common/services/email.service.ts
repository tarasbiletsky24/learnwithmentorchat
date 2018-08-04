import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  private reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  private url = `${environment.apiUrl}user`;
  private resetPage = `${environment.apiUrl}reset-password`;

  sendPasswordResetEmail(email: Email): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/password-reset?resetPasswordLink=${this.resetPage}`, email, { observe: 'response', headers: this.reqHeader });
  }
}
