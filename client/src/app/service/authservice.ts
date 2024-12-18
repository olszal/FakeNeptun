import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SHA256 from 'crypto-js/sha256';
import { User } from '../model/user';

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$ = signal<User>({} as User);
    

    constructor(private http: HttpClient) {}
      
    login(user: User) {
      user.password = CryptoJS.SHA256(user.password).toString(); // hash password
      return this.http.post('/login', user);
    }

    clean(): void {
        window.sessionStorage.clear();
      }
    
      public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    
      public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
          return JSON.parse(user);
        }
    
        return {};
      }
    
      public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
          return true;
        }
    
        return false;
      }
}







