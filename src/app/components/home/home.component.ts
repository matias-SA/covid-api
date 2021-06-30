import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/models/globalData.interface';
import { DataServicesService } from 'src/app/services/data-services.service';
import { Country } from 'src/app/models/countryData.interface';
import { Chart, ChartSize } from 'chart.js';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  globalData: Global;
  countriesData: Country[];
  countries: string[] = [];
  casesByCountries: number[] = [];
  casosConfirmados: number = 0;
  muertes: number = 0;
  recuperados: number = 0;
  newConfirmed: number = 0;
  newDeaths: number = 0;
  newRecovered: number = 0;
  totalActivate: number = 0;
  // PIE CHART INICIACION
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = this.countries;
  public pieChartData: SingleDataSet = this.casesByCountries;
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0)',
        'rgb(255, 211, 32)',
        'rgb(131, 202, 255)',
        'rgb(87, 157, 28)',
        'rgb(126, 0, 33)',
        'rgb(197, 0, 11)',
        'rgb(49, 64, 4)',
        'rgb(75, 31, 111)',
        'rgb(0, 69, 134)',
        'rgb(255, 149, 14)',
        'rgb(174, 207, 0)',
        'rgb(63, 147, 208)',
        'rgb(31, 72, 131)',
      ],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // BAR CHART INICIACION
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.countries;
  public barChartType: ChartType = 'bar';
  public barChartSize: ChartSize = {
    height: 500,
    width: 200,
  };
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: this.casesByCountries, label: 'Confirmados' },
  ];
  public barChartColors: Color[] = [{ backgroundColor: 'rgb(95, 152, 214)' }];

  constructor(private dataService: DataServicesService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe((result) => {
      console.log('allData', result);
      this.globalData = result.Global;
      this.countriesData = result.Countries;
      this.casosConfirmados = this.globalData.TotalConfirmed;
      this.muertes = this.globalData.TotalDeaths;
      this.recuperados = this.globalData.TotalRecovered;
      this.newConfirmed = this.globalData.NewConfirmed;
      this.newDeaths = this.globalData.NewDeaths;
      this.newRecovered = this.globalData.NewRecovered;
      this.totalActivate =
        this.casosConfirmados - this.recuperados - this.muertes;
      this.initChartData('TotalConfirmed');
    });
  }

  initChartData(caseType: string) {
    let value = [];
    value = this.countriesData;
    value.sort((a, b) => {
      // shich usar
      if (caseType == 'TotalConfirmed') {
        return b.TotalConfirmed - a.TotalConfirmed;
      } else if (caseType == 'TotalDeaths') {
        return b.TotalDeaths - a.TotalDeaths;
      } else if (caseType == 'TotalRecovered') {
        return b.TotalRecovered - a.TotalRecovered;
      }
    });
    console.log('this.countriesData', this.countriesData);

    value = value.slice(0, 13);

    for (let i = 0; i < value.length; i++) {
      this.countries[i] = value[i].Country;
      this.casesByCountries[i] = value[i][caseType];
    }
  }

  updateChart(input) {
    console.log('-------------------------');
    console.log('input', input);
    this.initChartData(input);
  }
}
