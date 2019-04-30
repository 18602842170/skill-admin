import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzNotificationService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/shared/service/login.service';
import { AricleDrawerComponent } from './aricle-drawer/aricle-drawer.component';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { LABLE_COLORS } from 'src/app/shared/service/article/const';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-aricle',
  templateUrl: './createAricle.component.html',
  styleUrls: ['./createAricle.component.less']
})
export class CreateAricleComponent implements OnInit {

  submitting = false;

  index = 0;

  lables = [];

  inputVisible = false;

  inputValue = '';

  lableColors = LABLE_COLORS;

  article = {
    id: null,
    title: '请点击填写文章标题',
    titleEdit: false,
    label: '',
    outline: '',
    contents: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private articleService: ArticleService,
    private drawerService: NzDrawerService,
    private titleService: Title
  ) { }

  ngOnInit() {
    // 编辑页面进入
    this.route.params
      .subscribe((params: Params) => {
        const articleId = params['articleId'];
        if (articleId) {
          this.searchData(articleId);
          this.titleService.setTitle(`文章编辑`);
        } else {
          this.titleService.setTitle(`文章新建`);
        }
      });
  }

  // 数据读取
  searchData(articleId: number) {
    this.articleService.get(articleId)
      .subscribe(article => {
        this.article = {
          id: article.id,
          title: article.title,
          titleEdit: false,
          label: article.label,
          outline: article.outline,
          contents: article.content,
        };
        if (this.article.label) {
          for (const lab of this.article.label.split(',')) {
            this.lables = [...this.lables, { value: lab, color: this.getColor() }];
          }
        }
        console.log(this.article);
      });
  }

  saveData(articleSuccess) {
    this.submitting = true;
    const saveLables: string[] = [];
    for (const lab of this.lables) {
      saveLables.push(lab.value);
    }
    if (this.article.id) {
      this.articleService.update({
        id: this.article.id,
        title: this.article.title,
        outline: this.article.outline,
        label: saveLables.join(','),
        content: this.article.contents,
      })
        .subscribe(article => {
          this.notification.template(articleSuccess);
          this.router.navigateByUrl(`/pages/article/${article.id}`);
        });
    } else {
      this.articleService.create({
        title: this.article.title,
        outline: this.article.outline,
        label: saveLables.join(','),
        content: this.article.contents,
      })
        .subscribe(article => {
          this.notification.template(articleSuccess);
          this.router.navigateByUrl(`/pages/article/${article.id}`);
        });
    }
  }

  deleteData(articleSuccess) {
    this.submitting = true;
    this.articleService.delete(this.article.id)
      .subscribe(rs => {
        this.notification.template(articleSuccess);
        this.router.navigateByUrl(`/pages/dashboard`);
      });
  }

  editTitle() {
    this.article.titleEdit = !this.article.titleEdit;
  }

  addContent() {
    const content = {
      title: '填写段落标题',
      titleEdit: false,
      content: []
    };
    this.article.contents.push(content);
    this.openComponent(content);
  }

  deleteContent(content) {
    this.article.contents.splice(this.article.contents.indexOf(content), 1);
  }

  openComponent(content): void {
    const drawerRef = this.drawerService.create<AricleDrawerComponent, { content: any }, any>({
      nzTitle: '段落编辑',
      nzContent: AricleDrawerComponent,
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzWidth: '720px',
      nzContentParams: {
        content: content
      }
    });

    drawerRef.afterOpen.subscribe(() => {
    });

    drawerRef.afterClose.subscribe(data => {
    });
  }

  handleClose(removedTag: {}): void {
    this.lables = this.lables.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.lables.indexOf(this.inputValue) === -1) {
      this.lables = [...this.lables, { value: this.inputValue, color: this.getColor() }];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  getColor(): string {
    return this.lableColors[Math.round(Math.random() * (this.lableColors.length - 1))];
  }
}
