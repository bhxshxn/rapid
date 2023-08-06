import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BASE_URL } from 'src/config';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
   providedIn: 'root',
})
export class ReportService {
   private url = `${BASE_URL}/advertisement/report`;
   errorData = {};

   httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };

   constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService,
   ) {}
   getReport(startDate: any, endDate: any, adId?: any): Observable<any> {
      return this.http
         .get<any>(
            this.url +
               `?start_date=${startDate}&end_date=${endDate}${
                  adId ? `&ad_id=${adId}` : ''
               }`,
            {
               responseType: 'json',
            },
         )
         .pipe(
            catchError(
               this.errorHandlerService.handleError<any>('fetchById', []),
            ),
         );
   }
}
