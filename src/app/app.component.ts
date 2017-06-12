import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {FormControl} from '@angular/forms';
import { WeatherService} from './weatherService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title: string = 'Weather works!';
  public city: string;
  public humidity: string;
  public daysForecast: any;
  public searchInput: FormControl = new FormControl();
  public temperature: string;


  public constructor(private _weatherService: WeatherService) {

  }

  public ngOnInit(): void {
    this.searchInput.valueChanges
      .debounceTime(500)
      .switchMap((city: string) => this._weatherService.getWeather(city))
      .retry(10)
      .subscribe(
        (res: any) => {
          this.setResponse(res);
        },
        (err: any) => {
          console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url);

        }
      );

  }

  public setResponse(res: any): void {
    this.city = res['city']['name'];
    this.daysForecast = res['list'].map(item => {
      return {
        dt_txt: item.dt_txt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description
      };
    });
  }

}
