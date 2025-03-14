import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NarratorService {

    private readonly API_URL = 'http://localhost:3000/api';

    constructor(
        private readonly http: HttpClient,
    ) { }

    getNarrators(): Observable<any> {
        return this.http.get(`${this.API_URL}/narrator/list`, {withCredentials: true})
        .pipe(
            map((narratorsData: any) => {
                return narratorsData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    getNarrator(narratorId: number): Observable<any> {
        return this.http.get(`${this.API_URL}/narrator/${narratorId}`, {withCredentials: true})
        .pipe(
            map((narratorData: any) => {
                return narratorData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    createNarrator(narratorData: any): Observable<any> {
        return this.http.post(`${this.API_URL}/narrator`, narratorData, {withCredentials: true})
        .pipe(
            map((narratorData: any) => {
                return narratorData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )

    }

    updateNarrator(narratorId: number, narratorData: any): Observable<any> {
        return this.http.put(`${this.API_URL}/narrator/${narratorId}`, narratorData, {withCredentials: true})
        .pipe(
            map((narratorData: any) => {
                return narratorData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    removeNarrator(narratorId: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/narrator/${narratorId}`, {withCredentials: true})
        .pipe(
            map((narratorData: any) => {
                return narratorData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    getNarration(narratorId: number, textSegment: string): Observable<any> {
        return this.http.post(`${this.API_URL}/narrator/narration`, {narratorId, textSegment} ,{
            withCredentials: true,
            responseType: 'blob'
        })
        .pipe(
            map((narrationData: any) => {
                return narrationData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }
}
