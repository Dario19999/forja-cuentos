import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    private readonly currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private readonly API_URL = 'http://localhost:3000/api';

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();

        this.checkAuthStatus();
    }

    checkAuthStatus() {
        this.http.get<any>(`${this.API_URL}/user`)
        .subscribe({
            next: (userData) => {
                this.currentUserSubject.next(userData);
            },
            error: () => {
                this.currentUserSubject.next(null);
            }
        });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.API_URL}/user/login`, { email, password }, {withCredentials: true})
        .pipe(
            map((userData: any) => {
                this.currentUserSubject.next(userData);
                return userData;
            }),
            catchError((err) => {
                console.error('Error durante el login:', err);
                return throwError(() => new Error('Credenciales inválidas'));
            })
        )
    }

    logout() {
        this.http.post(`${this.API_URL}/user/logout`, {}, { withCredentials: true })
        .subscribe({
            next: () => {
              this.currentUserSubject.next(null);
              this.router.navigate(['/login']);
            },
            error: () => {
              this.currentUserSubject.next(null);
              this.router.navigate(['/login']);
            }
        });
    }

    isLoggedIn(): boolean {
        return !!this.currentUserValue;
    }

    get currentUserValue() {
        return this.currentUserSubject.value;
    }
}
