import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketIOServiceService {
  private socket: any;
  constructor() {
    this.socket = io.connect('http://localhost:3000', {
      // Set the 'Access-Control-Allow-Origin' header
      extraHeaders: {
        'Access-Control-Allow-Origin': '*'
      },
      // Set the 'Access-Control-Allow-Credentials' header
      withCredentials: true
      ,
      // Set the 'Access-Control-Allow-Credentials' header
      transports: ['websocket']
    });
   }
listen (eventName: string) {
    return new Observable((subscriber:any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    }
    );
  }
  on (eventName: string) {
    return new Observable((subscriber:any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    }
    );
  }







emit = (eventName: string, data: any) => {

    this.socket.emit(eventName, data);
}
}
//



