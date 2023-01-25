import { Component, OnInit } from '@angular/core';
import { HomeComService } from '../services/home-com.service';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TableRow } from 'src/app/models/tableRow';
import { SafeUnsubscribe } from 'src/app/shared/safe-unsubscribe/safe-unsubscribe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends SafeUnsubscribe implements OnInit {
  constructor(private homeComService: HomeComService, private authService: AuthService) { 
    super()
  }

  tableRows$: Observable<TableRow[]> = of([]);
  counter = 1;
  tableRowsPerPage = 10;
  paginationLinksNumber: number = 0;
  paginationIndexes: number[] = [];
  isPreviousDisabled = false;
  isNextDisabled = false;
  isLoggedIn = this.authService.isUserLoggedIn();
  storedData$: BehaviorSubject<TableRow[]> = new BehaviorSubject<TableRow[]>([]);

  ngOnInit(): void {
    if (!localStorage.getItem('tableData')) {
      this.homeComService.initializeDataForTable();
    } else {
      this.homeComService.getTableRowsFromLocalStorage();
    }

    this.tableRows$ = combineLatest([this.homeComService.allTableRows$, this.homeComService.currentTablePage$])
      .pipe(
        takeUntil(this._ngUnsubscribe),
        map(([posts, tablePage]) => this.generatePagination(posts, tablePage))
      )

    this.setNavigationArrows();
  }

  generatePagination(rows: TableRow[], tablePage: number): TableRow[] {
    let totalRowsNumber = rows.length;
    let remainder = totalRowsNumber % this.tableRowsPerPage;

    if (remainder) {
      this.paginationLinksNumber = (totalRowsNumber - remainder) / this.tableRowsPerPage + 1;
    } else {
      this.paginationLinksNumber = totalRowsNumber / this.tableRowsPerPage;
    }

    this.paginationIndexes = Array.from({ length: this.paginationLinksNumber }, (value, index) => index + 1);

    let lastElIndex = tablePage * this.tableRowsPerPage;
    let firstElIndex = lastElIndex - this.tableRowsPerPage;

    if (rows) {
      return rows.slice(firstElIndex, lastElIndex)
    }

    return rows;
  }

  setNavigationArrows() {
    if (this.counter === 1) {
      this.isPreviousDisabled = true;
    }
  }

  goToPrevious() {
    this.isNextDisabled = false;
    this.counter--;
    this.homeComService.setCurrentTablePage(this.counter)
    if (this.counter === 1) {
      this.isPreviousDisabled = true;
    }
  }

  goToNext() {
    this.isPreviousDisabled = false;
    this.counter++;
    this.homeComService.setCurrentTablePage(this.counter)
    if (this.counter === this.paginationLinksNumber) {
      this.isNextDisabled = true;
    }
  }

  goToPage(pageNumber: number) {
    this.isNextDisabled = false;
    this.isPreviousDisabled = false;
    this.counter = pageNumber;
    this.homeComService.setCurrentTablePage(this.counter)

    if (this.counter === 1) {
      this.isPreviousDisabled = true;
    }
    if (this.counter === this.paginationLinksNumber) {
      this.isNextDisabled = true;
    }

  }
}
