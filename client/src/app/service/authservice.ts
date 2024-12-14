import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(user: User) {
        return this.http.post<User>('/login', user);
    }
}