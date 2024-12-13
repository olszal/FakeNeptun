import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(username: string, password: string ) {
        return this.http.post<User>('/login', {username, password});
            //.shareReplay();
    }
}