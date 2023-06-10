import { Injectable } from '@angular/core';
import {
   HttpClient,
   HttpErrorResponse,
   HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Post } from '../models/Post';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
// import { Adveatisers } from '../models/Adveatisers';
import { BASE_URL } from 'src/config';

@Injectable({
   providedIn: 'root',
})
export class RechargeService {
   private url = `${BASE_URL}/recharge/`;

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService
   ) {}

   fetchAll(): Observable<any> {
      return this.http.get(this.url + 'findAll');
   }

   create(data: any) {
      console.log({ data });
      return this.http
         .post(this.url + 'recharge_complet', data)
         .pipe(catchError(this.handleError));
   }

   delete(id): Observable<any> {
      return this.http
         .delete<any>(this.url + 'delete/' + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('delete', []))
         );
   }

   edit(id): Observable<any> {
      return this.http
         .get<any>(this.url + 'edit/' + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('edit', []))
         );
   }

   update(data: any) {
      console.log({ data: data });

      return this.http
         .put(this.url + 'update', data)
         .pipe(catchError(this.handleError));
   }

   private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         console.error('An error occurred:', error.error.message);
      } else {
         console.error(
            `Backend returned code ${error.status}, ` +
               `body was: ${error.error}`
         );
      }
      return throwError('Something bad happened. Please try again later.');
   }
}
