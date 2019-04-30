export const BASE_URL = 'http://127.0.0.1:8000';

export const LOGIN_URL = '/pages/login';

export const INDEX_URL = '/pages/create-aricle';

export const TOKEN_NAME = 'Authorization';

export const SOCKET_IO_URL = 'http://127.0.0.1:3000';


export const OSS = '';

export function transferToObject(obj: { [key: string]: string }, keyName: string, valueName: string) {
  const result: any[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const tmp = {};
      tmp[keyName] = key;
      tmp[valueName] = obj[key];
      result.push(tmp);
    }
  }
  return result;
}

export function findValueInMap(obj: { [key: string]: string }, value: string) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === value) {
        return key;
      }
    }
  }
  return 'not found';
}
