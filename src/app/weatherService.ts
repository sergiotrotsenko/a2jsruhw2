/**
 * Created by sergio on 6/11/17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class WeatherService {
  private baseWeatherURL: string= 'http://api.openweathermap.org/data/2.5/forecast?q=';
  private urlSuffix: string = "&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73";

  public constructor(private _http: Http) {}

  public getWeather(city: string): Observable<string[]> {
    return this._http.get(this.baseWeatherURL + city + this.urlSuffix)
      .map((res: any) => res.json())
      .catch( (err: any) => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
          return Observable.of();
        };
    });
  }


}
