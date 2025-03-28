import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaleService {
    private readonly API_URL = environment.API_URL;

    constructor(
        private readonly http: HttpClient
    ) { }

    getTales(): Observable<any> {
        return this.http.get(`${this.API_URL}/tale/list`, {withCredentials: true})
        .pipe(
            map((talesData: any) => {
                return talesData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    getTale(taleId: number): Observable<any> {
        return this.http.get(`${this.API_URL}/tale/${taleId}`, {withCredentials: true})
        .pipe(
            map((taleData: any) => {
                return taleData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    createTale(taleData: FormData): Observable<any> {
        return this.http.post(`${this.API_URL}/tale`, taleData, {withCredentials: true})
        .pipe(
            map((taleData: any) => {
                return taleData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    updateTale(taleId: number, taleData: FormData): Observable<any> {
        return this.http.put(`${this.API_URL}/tale/${taleId}`, taleData, {withCredentials: true})
        .pipe(
            map((taleData: any) => {
                return taleData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    removeTale(taleId: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/tale/${taleId}`, {withCredentials: true})
        .pipe(
            map((taleData: any) => {
                return taleData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

}
