import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { FileuploadService } from 'src/app/shared/service/fileupload.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-aricle-drawer',
  templateUrl: './aricle-drawer.component.html',
  styleUrls: ['./aricle-drawer.component.less']
})
export class AricleDrawerComponent implements OnInit {

  @Input() content: any = {};

  constructor(
    private drawerRef: NzDrawerRef<any>,
    private fileuploadService: FileuploadService,
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.drawerRef.close(this.content);
  }

  addString(content) {
    this.content.content.push(
      {
        type: 'string',
        editMsg: false,
        message: '请输入内容'
      });
  }

  deleteStringOrImg(content, msg) {
    if (msg.type === 'img') {
      const imgUrls = msg.message.split('/');
      this.fileuploadService.delete(`aricle/${imgUrls[imgUrls.length - 1]}`)
        .then(res => {
          console.log(res);
          content.content.splice(content.content.indexOf(msg), 1);
        }).catch(err => {
          console.log(err);
        });
    } else {
      content.content.splice(content.content.indexOf(msg), 1);
    }
  }

  // 上传文件
  addimg(e) {
    if (e.target.files.length <= 0) {
      return;
    }

    const file = e.target.files[0]; // 获取图片资源

    this.fileuploadService.upload(file, 'aricle')
      .then(res => {
        console.log(res);
        this.content.content.push(
          {
            type: 'img',
            editMsg: false,
            message: res.url
          });
      }).catch(err => {
        console.log(err);
      });
  }
}
