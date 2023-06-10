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
export class AdvertisementService {
   private url = `${BASE_URL}/advertisement`;

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService,
   ) {}

   fetchAll(): Observable<any> {
      return this.http.get(this.url + '/findAll');
   }

   create(data: any) {
      return this.http
         .post(this.url + '/new_adveatiser', data)
         .pipe(catchError(this.handleError));
   }

   articallogoType_videoCreate(data: any) {
      return this.http
         .post(this.url + '/articallogoType_video', data)
         .pipe(catchError(this.handleError));
   }

   magazineType(data: any) {
      return this.http
         .post(this.url + '/magazineType', data)
         .pipe(catchError(this.handleError));
   }

   custom_videoType(data: any) {
      return this.http
         .post(this.url + '/custom_videoType', data)
         .pipe(catchError(this.handleError));
   }

   articallogoType(data: any) {
      return this.http
         .post(this.url + '/articallogoType', data)
         .pipe(catchError(this.handleError));
   }

   singalType(data: any) {
      return this.http
         .post(this.url + '/singalType', data)
         .pipe(catchError(this.handleError));
   }

   youtube_videoType(data: any) {
      return this.http
         .post(this.url + '/youtube_videoType', data)
         .pipe(catchError(this.handleError));
   }

   delete(id): Observable<any> {
      return this.http
         .delete<any>(this.url + '/delete/' + id, { responseType: 'json' })
         .pipe(
            catchError(this.errorHandlerService.handleError<any>('delete', [])),
         );
   }

   // edit(id): Observable<any> {
   //    return this.http
   //       .get<any>(this.url + '/edit/' + id, { responseType: 'json' })
   //       .pipe(
   //          catchError(this.errorHandlerService.handleError<any>('edit', []))
   //       );
   // }

   Update(data: any) {
      return this.http
         .put(this.url + '/update', data)
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
               `body was: ${error.error}`,
         );
      }

      // return an observable with a user-facing error message

      return throwError('Something bad happened. Please try again later.');
   }
}
