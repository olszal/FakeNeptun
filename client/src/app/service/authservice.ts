import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$ = signal<User>({} as User);
    constructor(private http: HttpClient) {}
      
    login(user: User) {
        console.log("Logging in...");
        return this.http.post('/login', user);
    }
}