import { EventEmitter, Injectable } from '@angular/core';

import { Plant } from '../app/Model/plant.model'
import { Observable, of, Subject } from 'rxjs';


import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class WateringService {

  messageReceived = new EventEmitter<Plant>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  url = "https://localhost:44371/";

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.url + 'hub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
  myDate = new Date();
  getData(): Observable<Plant[]> {
    return of(this.data);
  }




  sendMessage(message: Plant) {
    // this.message$.next(message);
    this._hubConnection.invoke('SendMessage', message);
  }
  data: Plant[] = [
    { plantid: 1, plantName: 'Rose', lastWatered: this.myDate },
    { plantid: 2, plantName: 'Cactus', lastWatered: new Date(this.myDate.getTime() - 143200 * 2000), danger: true },
    { plantid: 3, plantName: 'Hydrangea', lastWatered: new Date(this.myDate.getTime() - 1040 * 50) },
    { plantid: 4, plantName: 'Succulent', lastWatered: new Date(this.myDate.getTime() - 154500 * 50) },
    { plantid: 5, plantName: 'Herb', lastWatered: new Date(this.myDate.getTime() - 1000 * 59990) },
    { plantid: 6, plantName: 'Climbing Vine', lastWatered: new Date(this.myDate.getTime() - 1000 * 55670) },

  ]
}
