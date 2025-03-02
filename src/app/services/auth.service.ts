import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventsService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private readonly API_URL = 'http://localhost:3000/api';

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly eventsService: EventsService
    ) {
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();

        this.checkAuthStatus();

        this.eventsService.on('auth:unauthorized').subscribe(() => {
            this.handleUnauthorized();
        });
    }

    private handleUnauthorized(): void {
        this.currentUserSubject.next(null);
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
                return throwError(() => err);
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
