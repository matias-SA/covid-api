import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/countryData.interface';
import { DataServicesService } from 'src/app/services/data-services.service';
import { Chart, ChartSize } from 'chart.js';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countriesData: Country[];
  countrySelected: string;
  countriesNames: string[] = [];
  casosConfirmados: number = 0;
  muertes: number = 0;
  recuperados: number = 0;
  newConfirmed: number = 0;
  newDeaths: number = 0;
  newRecovered: number = 0;
  totalActivate: number = 0;
  allConfirmedPerDay: number[] = [];
  confirmedPerDay: number[] = [];
  dayToDayData: any[] = [];
  dates: string[] = [];
  totalDays: number;
  datesChartData: string[] = [];
  updateDay: string;
  allConfirmedPerDayChartData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = this.dates;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: this.allConfirmedPerDay, label: 'Series A' },
  ];

  constructor(private dataService: DataServicesService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);

        this.countriesData = result.Countries;
        this.countriesData.forEach((cs) => {
          this.countriesNames.push(cs.Country);
          this.countrySelected = 'Argentina';
        });
      },
    });
    this.dataService.getDayOneTotalData().subscribe({
      next: (result) => {
        this.dayToDayData = result;
        result.forEach((x) => {
          this.allConfirmedPerDay.push(x.Confirmed);
          this.dates.push(x.Date.slice(0, 10));
        });
        console.log('this.dayToDayData', this.dayToDayData);
        this.getconfirmedPerDay();
        this.updateDay = this.dates[this.totalDays - 1];
      },
    });
  }

  countryChanged() {
    this.countriesData.forEach((cs) => {
      if (cs.Country === this.countrySelected) {
        console.log('cs', cs);
        this.casosConfirmados = cs.TotalConfirmed;
        this.muertes = cs.TotalDeaths;
        this.recuperados = cs.TotalRecovered;
        // this.newConfirmed = cs.NewConfirmed;
        // this.newDeaths = cs.NewDeaths;
        // this.newRecovered = cs.NewRecovered;
        this.totalActivate =
          this.casosConfirmados - this.recuperados - this.muertes;
      }
    });
  }
  getconfirmedPerDay() {
    this.confirmedPerDay.push(this.allConfirmedPerDay[0]);
    for (var i = 0; i < this.allConfirmedPerDay.length; i++) {
      this.confirmedPerDay.push(
        this.allConfirmedPerDay[i + 1] - this.allConfirmedPerDay[i]
      );
    }
    this.confirmedPerDay.pop();
    this.confirmedPerDay.reverse();
    this.totalDays = this.confirmedPerDay.length;
    this.newConfirmed = this.confirmedPerDay[0];
    console.log('this.newConfirmed', this.newConfirmed);
  }
  getChartData() {
    this.datesChartData = this.dates.slice(0, 13);
    this.allConfirmedPerDayChartData = this.allConfirmedPerDay.slice(0, 13);
    console.log('this.datesChartData', this.datesChartData);
    console.log(
      'this.allConfirmedPerDayChartData',
      this.allConfirmedPerDayChartData
    );
  }
}
