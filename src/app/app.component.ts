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

  displayedColumns = ['date', 'ledger', 'amount', 'company'];
 
  dataSource:any;
  pageEvent: any ;

  constructor(private dataService: DataService) { }

  


    ngOnInit(): void {
      this.initDataSource();
    }

    initDataSource() {
      this.dataService.findAll(1).pipe(
        map((userData: TransactionData) => this.dataSource = userData)
      ).subscribe();
    }

    onPaginateChange(event: PageEvent) {
      let page = event.pageIndex;
      let size = event.pageSize;
  
  
  
        page = page +1;
        this.dataService.findAll(page).pipe(
          map((userData: TransactionData) => this.dataSource = userData)
        ).subscribe();
      
  
    }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
 
 
}


