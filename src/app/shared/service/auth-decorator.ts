import { TOKEN_NAME } from './const';
// import { Headers, Http } from '@angular/http';

export function auth() {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    target.headers = new Headers({
      'Authorization': `${localStorage.getItem(TOKEN_NAME)}`,
    });
  };
}
