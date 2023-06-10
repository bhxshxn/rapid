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
import { Category } from '../models/Category';
import { BASE_URL } from 'src/config';

@Injectable({
   providedIn: 'root',
})
export class CategoryService {
   private url = `${BASE_URL}/category`;

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService
   ) {}

   fetchAll(): Observable<Category[]> {
      return this.http
         .get<Category[]>(this.url, { responseType: 'json' })
         .pipe(
            catchError(
               this.errorHandlerService.handleError<Category[]>('fetchAll', [])
            )
         );
   }

   createCategory(data) {
      return this.http
         .post<any>(this.url, data)
         .pipe(catchError(this.handleError));
   }

   deleteCategory(id): Observable<any> {
      return this.http
         .delete<any>(this.url + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('delete', []))
         );
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
