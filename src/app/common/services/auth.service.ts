import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  jwt = new JwtHelperService();

  isValid(token: string): boolean {
    return !this.jwt.isTokenExpired(token);
  }

  setUserData(token: string): void {
    const helper = new JwtHelperService();
    const user = helper.decodeToken(token);
    localStorage.setItem('userToken', token);
  }

  private getUser() {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  getUserId(): number {
    if (!this.getUser()) {
      return null;
    }
    return parseInt(this.getUser().Id, 10);
  }

  getUserFullName(): string {
    if (!this.getUser()) {
      return null;
    }
    return this.getUser().unique_name;
  }

  getUserRole(): string {
    if (!this.getUser()) {
      return null;
    }
    return this.getUser().role;
  }

  getUserEmail(): string {
    if (!this.getUser()) {
      return null;
    }
    return this.getUser().email;
  }
}
