import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public createRoom(name: string): Observable<object> {
    return this.httpClient.post('/api/createRoom', { name })
  }
}
