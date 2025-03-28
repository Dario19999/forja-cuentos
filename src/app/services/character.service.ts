import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

    private readonly API_URL = environment.API_URL;

    constructor(
        private readonly http: HttpClient,
    ) { }

    getCharacters(): Observable<any> {
        return this.http.get(`${this.API_URL}/character/list`, {withCredentials: true})
        .pipe(
            map((charactersData: any) => {
                return charactersData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    getCharacter(characterId: string): Observable<any> {
        return this.http.get(`${this.API_URL}/character/${characterId}`, {withCredentials: true})
        .pipe(
            map((characterData: any) => {
                return characterData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    createCharacter(characterData: any): Observable<any> {
        return this.http.post(`${this.API_URL}/character`, characterData, {withCredentials: true})
        .pipe(
            map((characterData: any) => {
                return characterData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )

    }

    updateCharacter(characterId: number, characterData: any): Observable<any> {
        return this.http.put(`${this.API_URL}/character/${characterId}`, characterData, {withCredentials: true})
        .pipe(
            map((characterData: any) => {
                return characterData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }

    removeCharacter(characterId: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/character/${characterId}`, {withCredentials: true})
        .pipe(
            map((characterData: any) => {
                return characterData;
            }),
            catchError((err) => {
                return throwError(() => err);
            })
        )
    }
}
