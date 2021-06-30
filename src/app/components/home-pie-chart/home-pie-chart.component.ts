import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-home-pie-chart',
  templateUrl: './home-pie-chart.component.html',
  styleUrls: ['./home-pie-chart.component.css'],
})
export class HomePieChartComponent implements OnInit {
  @Input() countries: string[] = [];
  @Input() casesByCountries: number[] = [];

  dataCountrie: string[] = this.countries;
  casesCountrie: number[] = this.casesByCountries;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = this.dataCountrie;
  public pieChartData: SingleDataSet = this.casesCountrie;
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0)',
        'rgba(0,255,0)',
        'rgba(0,0,255)',
        'rgba(255,255,0)',
        'rgba(0,255,255)',
        'rgba(192,192,192)',
        'rgba(128,0,0)',
        'rgba(0,0,0)',
        'rgba(255,255,255)',
        'rgba(128,0,128)',
        'rgba(0,255,255)',
        'rgba(30,144,255)',
        'rgba(255,0,255)',
      ],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {}

  ngOnInit(): void {
    console.log('this.countries', this.countries);
    console.log('casesByCountries', this.casesByCountries);
  }
}
