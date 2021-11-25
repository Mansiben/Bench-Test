import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TransactionData, DataService } from 'src/services/data.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restTest1';

  displayedColumns = ['date', 'company', 'account', 'amount',];

  dataSource: any;
  pageEvent: any;
  sum: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.dataService.findAll(1).pipe(
      map((userData: TransactionData) => this.dataSource = userData)
    ).subscribe(res => {
      for (let i = 1; i < 5; i++) {
        this.dataService.findAll(i).subscribe(res => {
          res.transactions.forEach((data: any) => {
            this.sum += parseFloat(data.Amount);
          });
        });
      }
    });
  }
    /** On click event for paginor to change the page of the table.
     * It gets the current pageIndex and call the api to fetch the data for the next page.**/

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    page = page + 1;
    this.dataService.findAll(page).pipe(
      map((userData: TransactionData) => this.dataSource = userData)
    ).subscribe();
  }

}


