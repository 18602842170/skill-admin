import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { LABLE_COLORS } from 'src/app/shared/service/article/const';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  index = 0;

  list = [];

  lableColors = LABLE_COLORS;

  list2 = [];

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(`skill-lbr&czq`);
    this.articleService.query({
      limit: 5,
      offset: 0,
      order_by: '-readCount',
      is_delete: false,
    })
      .subscribe(queryResults => {
        for (const aricle of queryResults.results) {
          let tags = [];
          if (aricle.label) {
            for (const lab of aricle.label.split(',')) {
              if (lab) {
                tags = [...tags, { value: lab, color: this.getColor() }];
              }
            }
          }
          this.list.push({
            ...aricle,
            tags
          });
        }
      });

    this.articleService.query({
      limit: 5,
      offset: 0,
      order_by: '-modify_time',
      is_delete: false,
    })
      .subscribe(queryResults => {
        for (const aricle of queryResults.results) {
          let tags = [];
          if (aricle.label) {
            for (const lab of aricle.label.split(',')) {
              if (lab) {
                tags = [...tags, { value: lab, color: this.getColor() }];
              }
            }
          }
          this.list2.push({
            ...aricle,
            tags
          });
        }
      });

  }

  clickOutline(data) {
    this.router.navigateByUrl(`/pages/article/${data.id}`);
  }

  getColor(): string {
    return this.lableColors[Math.round(Math.random() * (this.lableColors.length - 1))];
  }

}
