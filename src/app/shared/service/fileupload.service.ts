import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
declare var OSS: any;

export interface FileInfo {
  name?: string;
  path?: string;
}

@Injectable()
export class FileuploadService {

  oss = new OSS({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
  });

  constructor() { }

  /**
   * 文件上传
   * @param file 文件OBJ
   * @param folderName 文件夹路径
   */
  upload(file, folderName): Promise<any> {
    return this.oss.put(`${folderName}/${file.name}`, file);
  }

  /**
   * 文件删除
   * @param fileName 文件路径，包括文件夹路径
   */
  delete(fileName): Promise<any> {
    return this.oss.delete(`${fileName}`);
  }
}
