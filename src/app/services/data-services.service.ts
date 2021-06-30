import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../models/summary.interface';
import { DayData } from '../models/dayOneTotalData.interface';
@Injectable({
  providedIn: 'root',
})
export class DataServicesService {
  private globalDataUrl = 'https://api.covid19api.com/summary';
  private dayOneTotalDataUrl =
    'https://api.covid19api.com/total/dayone/country/argentina';
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
  };

  httpHeader;
  constructor(private http: HttpClient) {}

  getGlobalData(): Observable<Summary> {
    return this.http.get<Summary>(this.globalDataUrl, {
      headers: this.headers,
    });
  }
  getDayOneTotalData(): Observable<DayData[]> {
    return this.http.get<DayData[]>(this.dayOneTotalDataUrl, {
      headers: this.headers,
    });
  }
}
