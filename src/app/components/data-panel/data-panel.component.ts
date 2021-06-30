import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/countryData.interface';
import { Global } from 'src/app/models/globalData.interface';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css'],
})
export class DataPanelComponent implements OnInit {
  @Input() casosConfirmados: number;
  @Input() muertes: number;
  @Input() recuperados: number;
  @Input() newConfirmed: number;
  @Input() newDeaths: number;
  @Input() newRecovered: number;
  @Input() totalActivate: number;

  constructor() {}

  ngOnInit(): void {}
}
