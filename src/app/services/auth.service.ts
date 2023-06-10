import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { BASE_URL } from 'src/config';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // private url = "http://13.126.81.92:3000/auth";
   private url = `${BASE_URL}/auth`;

   isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
   userId: Pick<User, 'id'>;

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService,
      private router: Router
   ) {}

   signup(user: Omit<User, 'id'>): Observable<User> {
      user.device_type = '3';
      user.fcm_token = 'rewwrds';
      user.login_type = '1';
      user.social_login_id = 'fgs';
      user.phone = '+91' + user.phone;

      return this.http
         .post<User>(`${this.url}/signup`, user, this.httpOptions)
         .pipe(
            first(),
            catchError(this.errorHandlerService.handleError<User>('signup'))
         );
   }

   login(
      email: Pick<User, 'email'>,
      password: Pick<User, 'password'>
   ): Observable<{
      token: string;
      userId: Pick<User, 'id'>;
   }> {
      return this.http
         .post(`${this.url}/login`, { email, password }, this.httpOptions)
         .pipe(
            first(),
            tap((tokenObject: { token: string; userId: Pick<User, 'id'> }) => {
               this.userId = tokenObject.userId;
               localStorage.setItem('token', tokenObject.token);
               localStorage.setItem('firstLogin', 'true');
               this.isUserLoggedIn$.next(true);
               // window.location.reload;

               this.router.navigate(['/']);
            }),
            catchError(
               this.errorHandlerService.handleError<{
                  token: string;
                  userId: Pick<User, 'id'>;
               }>('login')
            )
         );
   }

   isLoggedIn() {
      let token = localStorage.getItem('token');
      console.log(token);

      if (
         token == undefined ||
         token === '' ||
         token == null ||
         token == 'null'
      ) {
         console.log(false);
         return false;
      } else {
         console.log(true);
         return true;
      }
   }

   isFirstLoggedIn() {
      let firstLogin = localStorage.getItem('firstLogin');
      console.log(firstLogin);

      if (
         firstLogin == undefined ||
         firstLogin === '' ||
         firstLogin == null ||
         firstLogin == 'null'
      ) {
         console.log(false);
         return false;
      } else {
         console.log(true);
         return true;
      }
   }

   logout() {
      console.log('Logout clicked');
      localStorage.removeItem('token');
      this.isUserLoggedIn$.next(false);
      return true;
   }

   fetchAll(): Observable<User[]> {
      return this.http
         .get<User[]>(`${this.url}/findAll`, { responseType: 'json' })
         .pipe(
            catchError(
               this.errorHandlerService.handleError<User[]>('findAll', [])
            )
         );
   }
}
