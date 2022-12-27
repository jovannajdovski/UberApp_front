import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Driver } from '../../model/driver';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss']
})
export class AdministratorHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Driver>;
  drivers: Driver[] = [];
  totalElements!: number;
  pageSize = 6;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef, private driverService: DriverService) {}

  ngOnInit() {
    this.getDrivers({ page: "0", size: "6" });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private getDrivers(request: any) {
    this.driverService.getAll(request).subscribe({
      next: (res: any) => {
        this.drivers = res['results'];
        this.totalElements = res["totalCount"];
        this.paginator.length = this.totalElements;

        this.dataSource = new MatTableDataSource<Driver>(this.drivers);
        this.changeDetectorRef.detectChanges();
        this.obs = this.dataSource.connect();
      }
    });
  }

  nextPage(event: PageEvent) {
    const request = { 
      page: event.pageIndex.toString(), 
      size: event.pageSize.toString()
    };
    this.getDrivers(request);
}

  onResize(event: any) {
    // if (event.target.innerWidth <= 1000) {
    //   this.pageSize = 3;
    // } else {
    //   this.pageSize = 6;
    // }
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
