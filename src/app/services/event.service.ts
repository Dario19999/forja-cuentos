import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly eventsSubject = new Subject<any>();

  emit(event: string, data?: any): void {
    this.eventsSubject.next({ event, data });
  }

  on(event: string): Observable<any> {
    return this.eventsSubject.asObservable().pipe(
      filter(e => e.event === event),
      map(e => e.data)
    );
  }
}
