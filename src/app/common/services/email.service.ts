import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse,  } from '@angular/common/http';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  //private reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  private reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  private url = `${environment.apiUrl}user`;
  private resetPage = `${environment.uiUrl}password-reset`;
  private emailConfirmPage = `${environment.uiUrl}confirm-email`;

  sendPasswordResetEmail(email: Email): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/password-reset?resetPasswordLink=${this.resetPage}`, email, { observe: 'response', headers: this.reqHeader });
  }

  sendEmailConfirmationEmail(email: Email): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/confirm-email?emailConfirmLink=${this.emailConfirmPage}`, email, { observe: 'response', headers: this.reqHeader });
  }
}
