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
import { BASE_URL } from 'src/config';

@Injectable({
   providedIn: 'root',
})
export class AdveatiserService {
   private url = `${BASE_URL}/adveatisers`;

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService
   ) {}

   fetchAll(): Observable<any> {
      return this.http.get(this.url + '/findAll_adveatiser');
   }

   view(id: any) {
      return this.http.get(this.url + '/view/' + id, { responseType: 'json' });
   }

   create(data: any) {
      return this.http.post(this.url + '/new_adveatiser', data);
      // .pipe(catchError(this.handleError));
   }

   delete(id): Observable<any> {
      return this.http
         .delete<any>(this.url + '/delete/' + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('delete', []))
         );
   }

   edit(id): Observable<any> {
      return this.http
         .get<any>(this.url + '/edit/' + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('edit', []))
         );
   }

   UpdateAdveatiser(data: any) {
      return this.http
         .post(this.url + '/update_adveatiser', data)
         .pipe(catchError(this.handleError));
   }

   private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         // A client-side or network error occurred. Handle it accordingly.

         console.error('An error occurred:', error.error.message);
      } else {
         // The backend returned an unsuccessful response code.

         // The response body may contain clues as to what went wrong.

         console.error(
            `Backend returned code ${error.status}, ` +
               `body was: ${error.error}`
         );
      }

      // return an observable with a user-facing error message

      return throwError('Something bad happened. Please try again later.');
   }
}
