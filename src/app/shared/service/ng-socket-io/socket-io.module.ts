import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { WrappedSocket } from './socket-io.service';
import { SocketIoConfig } from './socketIoConfig';
import { SOCKET_CONFIG_TOKEN } from './socket-ioToken';


/** Socket factory */
export function SocketFactory(config: SocketIoConfig) {
  return new WrappedSocket(config);
}

@NgModule({})
export class SocketIoModule {
  static forRoot(config: SocketIoConfig): ModuleWithProviders {
    return {
      ngModule: SocketIoModule,
      providers: [
        { provide: SOCKET_CONFIG_TOKEN, useValue: config },
        {
          provide: WrappedSocket,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    };
  }
}
