import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly API_URL = 'http://localhost:3000/api';

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
    ) { }

    getUser(): Observable<any> {
        return this.http.get(`${this.API_URL}/user`, {withCredentials: true})
        .pipe(
            map((userData: any) => {
                return userData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    updateUser(userData: {name: string, lastName: string, secondLastName: string}): Observable<any> {
        return this.http.put(`${this.API_URL}/user`, userData, {withCredentials: true})
        .pipe(
            map((userData: any) => {
                return userData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }
}
