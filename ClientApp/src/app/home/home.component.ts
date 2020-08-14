import { HttpClient } from '@angular/common/http';

import { WateringService } from '../watering.service'
import { Plant, Message } from '../Model/plant.model';
import { Pipe, PipeTransform, NgZone } from '@angular/core';
import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  watertime = 30;
  alerttime = 60;

  public forecasts: WeatherForecast[];
  intervalHolder: any;
  messages = new Array<Plant>();
  Plants = []
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,

    private wateringService: WateringService,
    private _ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    this.subscribeToEvents();
  }

  ngOnInit() {
    this.wateringService.getData().subscribe(p => this.Plants = p);
    this.intervalHolder = setInterval(() => {
      // Let's refresh the list.
      this.changeDetectorRef.markForCheck();
    }, 1000 * 1); // 1 minute


  }
  private subscribeToEvents(): void {

    this.wateringService.messageReceived.subscribe((message: Plant) => {
      this._ngZone.run(() => {

        this.messages.push(message);
        var index = this.Plants.findIndex(x => x.plantid == message.plantid);
        const myplant = this.Plants[index];
        if (myplant != undefined) {
          myplant.lastWatered = message.lastWatered;
          this.Plants[index] = myplant;
        }

      });
    });
  }
  waterme(e) {
    console.log('clicked');
    var index = this.Plants.findIndex(x => x.plantid == e.plantid);
    const myplant = this.Plants[index];
    myplant.lastWatered = new Date();
    this.Plants[index] = myplant;
    this.sendMessage(myplant)
  }
  sendMessage(p: Plant): void {
    this.wateringService.sendMessage(p);
  }
  checkWaterTime(p: Plant) {
    // console.log('pp', p.lastWatered)

    let nextTime = moment(p.lastWatered).add('seconds', this.watertime);
    let today = moment().toDate();

    if (nextTime.diff(today) < 0) {
      return false;
    } else {
      return true;
    }


  }
  content;
  checkAlert(p: Plant) {
    // console.log('pp', p.lastWatered)

    //let nextTime = new Date(p.lastWatered.getTime() + 1000 * 60 * 60 * 6);
    let nextTime = moment(p.lastWatered).add('seconds', this.alerttime)


    let today = moment().toDate();

    return (nextTime.diff(today));

  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

