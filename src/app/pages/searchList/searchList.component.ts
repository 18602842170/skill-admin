import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEvent, observable, } from 'rxjs';
import { auditTime, switchMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { LABLE_COLORS } from 'src/app/shared/service/article/const';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchList.component.html',
  styleUrls: ['./searchList.component.less']
})
export class SearchListComponent implements OnInit, OnDestroy {
  index = 0;

  pageCon = {
    searchStr: '',
    pageSize: 5,
    pageNum: 1,
    isSpinning: true,
    canSearch: true,
  };

  lableColors = LABLE_COLORS;

  list = [];

  sub = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService: Title
  ) { }

  ngOnInit() {
    // 当路由到当前路径时，再次进入路由参数的接收observable中
    this.router.onSameUrlNavigation = 'reload';
    this.route.params
      .subscribe((params: Params) => {
        this.list = [];
        this.pageCon.pageNum = 1;
        this.pageCon.isSpinning = true;
        this.pageCon.canSearch = true;
        this.pageCon.searchStr = params['searchStr'];
        this.titleService.setTitle(`${this.pageCon.searchStr}搜索结果`);
        this.searchData();

        // 滚动监听
        this.sub = fromEvent(window, 'scroll')
          .pipe(
            auditTime(1000),
          )
          .subscribe((event) => {
            if (!this.pageCon.isSpinning) {
              const h = document.documentElement.clientHeight;
              const H = document.documentElement.scrollHeight;
              const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              if (h + scrollTop + 20 > H) {
                // 到达底部
                this.pageCon.isSpinning = true;
                this.searchData();
              } else {
                this.pageCon.isSpinning = false;
              }
            }
          });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  searchData() {
    // 是否有数据可搜索
    if (this.pageCon.canSearch) {
      this.articleService.query({
        search: this.pageCon.searchStr,
        order_by: '-readCount',
        limit: this.pageCon.pageSize,
        offset: this.pageCon.pageSize * (this.pageCon.pageNum - 1),
        is_delete: false,
      }).subscribe(queryResults => {
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
        this.pageCon.isSpinning = false;
        // 数据是否大于5
        if (queryResults.results.length < 5) {
          this.pageCon.canSearch = false;
          // 关闭滚动监听
          this.sub.unsubscribe();
        } else {
          this.pageCon.pageNum += 1;
        }
      });
    }
  }

  clickContent(data) {
    this.router.navigateByUrl(`/pages/article/${data.id}`);
  }

  getColor(): string {
    return this.lableColors[Math.round(Math.random() * (this.lableColors.length - 1))];
  }

}
