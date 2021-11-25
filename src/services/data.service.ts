import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { DataModal } from 'src/modal/data.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



export interface TransactionData{
  transactions: DataModal[],
  totalCount : number,
  page : number
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  findAll(page: number): Observable<TransactionData> {
    let params = new HttpParams();
    
   

    return this.http.get('https://resttest.bench.co/transactions/' + page +'.json' ).pipe(
      map((transData: any) => transData),
      catchError(err => throwError(err))
    )
  }
}
