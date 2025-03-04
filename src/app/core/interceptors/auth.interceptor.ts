import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventsService } from '../../services/event.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly eventsService: EventsService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && request.url.includes('/user/login')) {
            return throwError(() => error);
        }

        if (error.status === 401 || error.status === 403) {
          this.eventsService.emit('auth:unauthorized', error);
          this.router.navigate(['/home']);
          return throwError(() => new Error('Sesión expirada. Por favor, vuelve a iniciar sesión.'));
        }
        return throwError(() => error);
      })
    );
  }
}
