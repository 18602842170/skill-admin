import { InjectionToken } from '@angular/core';
import { SocketIoConfig } from './socketIoConfig';

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG__');
