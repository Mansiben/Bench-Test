/** Data Service to make the code reusable in angular.*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataModal } from 'src/modal/data.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface TransactionData {
  transactions: DataModal[],
  totalCount: number,
  page: number
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**Main api end point to call the GET method and fetch the transcations as per the page request.*/

  findAll(page: number): Observable<TransactionData> {
    return this.http.get('https://resttest.bench.co/transactions/' + page + '.json').pipe(
      map((transData: any) => transData),
      /** Catching the error from server side or network related. */
      catchError(err => throwError(err))
    )
  }
}
