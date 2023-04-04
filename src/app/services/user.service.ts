import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginRequest } from '../interfaces/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('/api/user');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }

  sendLoginRequest(loginRequest: LoginRequest): Observable<any> {
    return this.http.post("/api/user/login", loginRequest).pipe(
      catchError(this.handleError)
    );
  }

  sendRegisterRequest(registerRequest: any): Observable<any> {
    return this.http.post("/api/user", registerRequest).pipe(
      catchError(this.handleError)
    );
  }

}
