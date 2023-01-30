import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Passenger} from "../../model/Passenger";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../shared/services/shared.service";
import {PageRequest} from "../../model/PageRequest";
import {PassengerService} from "../../services/passenger.service";
import {PassengersPageResponse} from "../../model/PassengersPageResponse";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit, OnDestroy {
  obs!: Observable<Passenger[]>;
  passengers: Passenger[] = [];
  dataSource: MatTableDataSource<Passenger> = new MatTableDataSource<Passenger>(this.passengers);
  totalElements!: number;
  pageSize = 3;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private passengerService: PassengerService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getPassengers({page: this.currentPage.toString(), size: this.pageSize.toString()});
    this.dataSource.paginator = this.paginator;
  }

  private getPassengers(request: PageRequest) {
    this.passengerService.getAll(request).subscribe({
      next: (response: PassengersPageResponse) => {
        this.passengers = response.results;
        this.totalElements = response.totalCount;
        this.paginator.length = this.totalElements;

        this.dataSource.data = this.passengers;
        this.obs = this.dataSource.connect();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  nextPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    const request = {
      page: event.pageIndex.toString(),
      size: event.pageSize.toString()
    };
    this.getPassengers(request);
  }

  toastCallback = (message: string) => {
    this.openSnackBar(message);
    this.getPassengers({page: this.currentPage.toString(), size: this.pageSize.toString()});
  }

  openSnackBar = (message: string) => {
    this.sharedService.openSnack(message);
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
