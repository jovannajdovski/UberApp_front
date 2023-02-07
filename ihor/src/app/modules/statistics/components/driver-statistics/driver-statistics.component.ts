import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DashboardRideCountComponent} from "../dashboard-ride-count/dashboard-ride-count.component";
import {DashboardRideDistanceComponent} from "../dashboard-ride-distance/dashboard-ride-distance.component";
import {MatChipListboxChange} from "@angular/material/chips";
import {HttpErrorResponse} from "@angular/common/http";
import {DriverStatisticsService} from "../../services/driver-statistics.service";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "../../../driver/services/driver.service";
import {Profile} from "../../../account/model/profile";

@Component({
  selector: 'app-driver-statistics',
  templateUrl: './driver-statistics.component.html',
  styleUrls: ['./driver-statistics.component.scss']
})
export class DriverStatisticsComponent implements OnInit {
  // Date picker objects
  today = new Date();
  range = new FormGroup({
    start: new FormControl(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1)),
    end: new FormControl(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())),
  });
  chosenStart = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
  chosenEnd = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());


  // Chip objects
  selectedStatisticsType = "1";

  // Objects related to chart
  chart: any

  dps: { x: Date, y: number }[] = []

  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Number of Visits",
      crosshair: {
        enabled: true
      }
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "right",
      dockInsidePlotArea: true,
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      showInLegend: true,
      color: "#FFE32B",
      name: "Total Visit",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      dataPoints: this.dps
    }],
  }

  @ViewChild(DashboardRideCountComponent) dashboardRideCountComponent!: DashboardRideCountComponent;
  @ViewChild(DashboardRideDistanceComponent) dashboardRideDistanceComponent!: DashboardRideDistanceComponent;
  showFirstComponent = true;
  showSecondComponent = false;
  id = 0;

  driver!: Profile;
  driverImage: any;

  constructor(private route: ActivatedRoute,
              private driverService: DriverService,
              private driverStatisticsService: DriverStatisticsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idAsNum = parseInt(id);
      if (isNaN(idAsNum)) {
        return;
      }
      this.id = idAsNum;

      this.fetchDriver();
      this.fetchRidesCount(this.chosenStart, this.chosenEnd)
    }
  }

  fetchDriver() {
    this.driverService.getDriver(this.id).subscribe({
      next: (result) => {
        this.driver = result;
        if (this.driver.profilePicture == null)
          this.driverImage = "assets/images/user_missing.png";
        else
          this.driverImage = this.driver.profilePicture;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      },
    })
  }

  getChartInstance(chart: object) {
    this.chart = chart
  }

  updateChart() {
    if (!this.chosenStart || !this.chosenEnd || !this.selectedStatisticsType)
      return;

    if (this.selectedStatisticsType == "1") {
      this.fetchRidesCount(this.chosenStart, this.chosenEnd);
      this.showFirstComponent = true;
      this.showSecondComponent = false;
    } else if (this.selectedStatisticsType == "2") {
      this.fetchRideDistance(this.chosenStart, this.chosenEnd);
      this.showFirstComponent = false;
      this.showSecondComponent = true;
    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    const fromStr = dateRangeStart.value;
    const toStr = dateRangeEnd.value;
    if (!fromStr || !toStr)
      return

    this.chosenStart = new Date(fromStr);
    this.chosenEnd = new Date(toStr);

    this.updateChart()
  }

  chipSelectChange(chip: MatChipListboxChange) {
    if (!chip.value)
      return

    this.selectedStatisticsType = chip.value;
    this.updateChart()
  }

  fetchRidesCount(from: Date, to: Date) {
    this.driverStatisticsService.getRideCountStatistics(this.id, from, to).subscribe({
      next: (result) => {
        this.dps.splice(0);
        result.countPerDay.forEach((element) => {
          const date = new Date(element.day);
          this.dps.push({x: date, y: element.count});
        });

        this.chartOptions.axisY.title = "Ride Count";
        this.chartOptions.data[0].name = "Number of rides";
        this.chartOptions.data[0].color = "#FFE32B";
        this.chart.render();

        this.dashboardRideCountComponent.sumValue = result.totalCount.toString();
        this.dashboardRideCountComponent.avgValue = result.averageCount.toString();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      },
    })
  }

  fetchRideDistance(from: Date, to: Date) {
    this.driverStatisticsService.getRideDistanceStatistics(this.id, from, to).subscribe({
      next: (result) => {
        this.dps.splice(0);
        result.distancePerDay.forEach((element) => {
          const date = new Date(element.day);
          this.dps.push({x: date, y: element.distance});
        });

        this.chartOptions.axisY.title = "Ride distance (km)";
        this.chartOptions.data[0].name = "Distance passed";
        this.chartOptions.data[0].color = "#4caf50";
        this.chart.render();

        this.dashboardRideDistanceComponent.sumValue = result.totalDistance.toString();
        this.dashboardRideDistanceComponent.avgValue = result.averageDistance.toString();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      },
    })
  }
}
