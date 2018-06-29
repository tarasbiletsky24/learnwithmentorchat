import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  jwt = new JwtHelperService();

  isValid(token: string): boolean{
    return !this.jwt.isTokenExpired(token);
  }

  setUserData(token: string): void{
    const helper = new JwtHelperService();
    const user = helper.decodeToken(token);
    localStorage.setItem('userToken', token);
    localStorage.setItem('id', user.Id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('fullName', user.unique_name);
    localStorage.setItem('role', user.role);
  }
}
