import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { Driver } from '../../model/driver';
import { DriverService } from '../../services/driver.service';
import { AddDriverDialogComponent } from '../add-driver-dialog/add-driver-dialog.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit, AfterViewInit, OnDestroy {

  obs!: Observable<any>;
  drivers: Driver[] = [];
  dataSource: MatTableDataSource<Driver> = new MatTableDataSource<Driver>(this.drivers);
  totalElements!: number;
  pageSize = 3;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private driverService: DriverService,
    private sharedService: SharedService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getDrivers({ page: this.currentPage.toString(), size: this.pageSize.toString() });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
  }

  private getDrivers(request: any) {
    this.driverService.getAll(request).subscribe({
      next: (res: any) => {
        this.drivers = res['results'];
        this.totalElements = res["totalCount"];
        this.paginator.length = this.totalElements;

        console.log(this.drivers);

        this.dataSource.data = this.drivers;
        this.obs = this.dataSource.connect();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  openAddDriverDialog() {
    const dialogRef = this.dialog.open(AddDriverDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.openSnackBar("Driver added successfully");
        this.currentPage=Math.floor((this.totalElements+this.pageSize)/this.pageSize-1);
        this.paginator.pageIndex = this.currentPage;
        this.getDrivers({ page: this.currentPage.toString(), size: this.pageSize.toString() });
      }
    });
  }

  driverEdited = ()=>{ 
    this.openSnackBar("Driver edited successfully");
    this.getDrivers({ page: this.currentPage.toString(), size: this.pageSize.toString() });
  }

  openSnackBar = (message: string)=>{  
    this.sharedService.openSnack(message);
  }

  nextPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize=event.pageSize;

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
