import { Injectable } from '@angular/core';
import { Socket } from './ng-socket-io';

@Injectable()
export class PushService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit('chat message', msg);
  }

  getMessage<T>(event: string) {
    return this.socket
      .fromEvent<T>(event);
  }
}
