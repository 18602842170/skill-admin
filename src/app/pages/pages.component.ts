import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
  pageReady = false;

  searchStr = '';

  constructor(
    private router: Router,
    private notification: NzNotificationService,
  ) {
  }

  viewflag = false;

  ngOnInit() {
    if ('/pages' === this.router.url) {
      this.router.navigateByUrl('/pages/dashboard');
    }
  }

  clickSearch(notification, topButtonStr) {
    if (topButtonStr) {
      this.router.navigate(`/pages/search/${topButtonStr}`.split('/'));
    } else
      if (this.searchStr) {
        this.router.navigate(`/pages/search/${this.searchStr}`.split('/'));
      } else {
        this.notification.template(notification);
      }
  }
}
