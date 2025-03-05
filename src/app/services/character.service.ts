import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

    private readonly API_URL = 'http://localhost:3000/api';

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
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
}
