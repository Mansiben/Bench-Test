import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  sum: any = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.dataService.findAll(1).pipe(
      map((userData: TransactionData) => this.dataSource = userData)
    ).subscribe(res => {
      for (let i =1 ;i <5 ;i++){
        this.dataService.findAll(i).subscribe(res => {
          // this.SumData.push(res);
          console.log(res.transactions);
          res.transactions.forEach((data: any) => {
            this.sum += parseFloat(data.Amount);
          });
        });
      }
    });

  
     
  

    

  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;

    page = page + 1;
    this.dataService.findAll(page).pipe(
      map((userData: TransactionData) => this.dataSource = userData)
    ).subscribe();


  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */


}


