import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/shared/service/login.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  code = '';

  loging = false;

  constructor(
    private loginService: LoginService,
    private notification: NzNotificationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('登陆');
  }

  login(loginSuccess, loginError) {
    this.loging = true;
    this.loginService.login(this.code)
      .subscribe(msg => {
        this.loging = false;
        if (msg === 'codeError') {
          this.notification.template(loginError);
        } else {
          this.notification.template(loginSuccess);
        }
      });
  }

}
