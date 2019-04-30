
export function toConnet(obj) {
    let str = '';
    const i = 1;
    const a = Object.keys(obj).length;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (null != obj[key]) {
          if (obj[key].toString().length > 0) {
            str += key + '=' + obj[key] + '&';
          }
        } else {
          str += '&';
        }
      }
    }
    return str;
}

export function toISOstring(obj) {
    if (obj instanceof Date) {
      return obj.toISOString();
    } else {
      return obj;
    }
}
