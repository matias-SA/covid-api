import { Country } from './countryData.interface';
import { Global } from './globalData.interface';

export interface Summary {
  ID: any;
  Message: string;
  Global: Global;
  Countries: Country[];
}
