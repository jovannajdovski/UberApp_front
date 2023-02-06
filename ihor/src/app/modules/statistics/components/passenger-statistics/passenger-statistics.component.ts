import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DashboardRideCountComponent} from "../dashboard-ride-count/dashboard-ride-count.component";
import {DashboardRideDistanceComponent} from "../dashboard-ride-distance/dashboard-ride-distance.component";
import {Profile} from "../../../account/model/profile";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatChipListboxChange} from "@angular/material/chips";
import {PassengerService} from "../../../passenger/services/passenger.service";
import {PassengerStatisticsService} from "../../services/passenger-statistics.service";
import {DashboardMoneySpentComponent} from "../dashboard-money-spent/dashboard-money-spent.component";

@Component({
  selector: 'app-passenger-statistics',
  templateUrl: './passenger-statistics.component.html',
  styleUrls: ['./passenger-statistics.component.scss']
})
export class PassengerStatisticsComponent implements OnInit {
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
  @ViewChild(DashboardMoneySpentComponent) dashboardMoneySpentComponent!: DashboardMoneySpentComponent;
  showFirstComponent = true;
  showSecondComponent = false;
  showThirdComponent = false;
  id = 0;

  passenger!: Profile;
  passengerImage: any;

  constructor(private route: ActivatedRoute,
              private passengerService: PassengerService,
              private passengerStatisticsService: PassengerStatisticsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idAsNum = parseInt(id);
      if (isNaN(idAsNum)) {
        return;
      }
      this.id = idAsNum;

      this.fetchPassenger();
      this.fetchRidesCount(this.chosenStart, this.chosenEnd)
    }
  }

  fetchPassenger() {
    this.passengerService.getPassenger(this.id).subscribe({
      next: (result) => {
        this.passenger = result;
        if (this.passenger.profilePicture == null)
          this.passengerImage = "assets/images/user_missing.png";
        else
          this.passengerImage = this.passenger.profilePicture;
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
      this.showThirdComponent = false;
    } else if (this.selectedStatisticsType == "2") {
      this.fetchRideDistance(this.chosenStart, this.chosenEnd);
      this.showFirstComponent = false;
      this.showSecondComponent = true;
      this.showThirdComponent = false;
    } else if (this.selectedStatisticsType == "3") {
      this.fetchMoneySpent(this.chosenStart, this.chosenEnd);
      this.showFirstComponent = false;
      this.showSecondComponent = false;
      this.showThirdComponent = true;
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
    this.passengerStatisticsService.getRideCountStatistics(this.id, from, to).subscribe({
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
    this.passengerStatisticsService.getRideDistanceStatistics(this.id, from, to).subscribe({
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
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      },
    })
  }

  fetchMoneySpent(from: Date, to: Date) {
    this.passengerStatisticsService.getMoneySpentStatistics(this.id, from, to).subscribe({
      next: (result) => {
        this.dps.splice(0);
        result.amountPerDay.forEach((element) => {
          const date = new Date(element.day);
          this.dps.push({x: date, y: element.amount});
        });

        this.chartOptions.axisY.title = "Money spent ($)";
        this.chartOptions.data[0].name = "Amount of money spent";
        this.chartOptions.data[0].color = "#4caf50";
        this.chart.render();

        this.dashboardMoneySpentComponent.sumValue = result.totalAmount.toString();
        this.dashboardMoneySpentComponent.avgValue = result.averageAmount.toString();
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      },
    })
  }
}
