import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { addDays, distanceInWords } from 'date-fns';
import { NzNotificationService } from 'ng-zorro-antd';
import * as html2canvas from 'html2canvas';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { switchMap } from 'rxjs/operators';
import { CommentService } from 'src/app/shared/service/article/comment.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  canvasImg;

  index = 0;

  articleId = 0;

  isSpinning = true;

  likeList = [];

  article = null;

  comments = [];

  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  newComments = {
    message: '',
    rate: 3,
    likes: 0,
    dislikes: 0,
    article: -1,
  };

  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private articleService: ArticleService,
    private commentService: CommentService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.articleId = params['articleId'];
        this.newComments.article = this.articleId;
        this.comments = [];
        this.searchData();
      });
  }

  searchData() {
    this.articleService.get(this.articleId)
      .pipe(
        switchMap(article => {
          this.article = article;
          this.titleService.setTitle(`${article.title}`);
          return this.commentService.query({
            article: this.articleId,
          });
        }),
        switchMap(queryResults => {
          for (const cm of queryResults.results) {
            this.comments.push({ ...cm, isSign: false });
          }
          return this.articleService.query({
            search: this.getLikeString(this.article.label),
            order_by: '-readCount',
            limit: 5,
            offset: 0,
            is_delete: false,
          });
        }),
      )
      .subscribe(queryResults => {
        this.likeList = queryResults.results;
      });
  }

  clickContent(data) {
    this.router.navigateByUrl(`/pages/article/${data.id}`);
  }

  like(comment, commentSuccess, commentError) {
    if (!comment.isSign) {
      comment.likes += 1;
      comment.isSign = true;
      this.notification.template(commentSuccess);
      this.commentService.update(comment)
        .subscribe();
    } else {
      this.notification.template(commentError);
    }
  }

  dislike(comment, commentSuccess, commentError) {
    if (!comment.isSign) {
      comment.dislikes += 1;
      comment.isSign = true;
      this.notification.template(commentSuccess);
      this.commentService.update(comment)
        .subscribe();
    } else {
      this.notification.template(commentError);
    }
  }

  saveComment(commentSuccess, commentError) {
    this.submitting = true;
    this.commentService.create(
      this.newComments
    ).subscribe(comment => {
      this.newComments = {
        message: '',
        rate: 3,
        likes: 0,
        dislikes: 0,
        article: -1,
      };
      this.comments.push(comment);
      this.notification.template(commentSuccess);
      this.submitting = false;
    });
  }

  createImg() {
    html2canvas(document.querySelector(`#contentBody`)).then(canvas => {
      this.canvasImg = canvas.toDataURL(`image/png`);
      this.downloadFile(this.article.title, this.canvasImg);
    });
  }

  downloadFile(filename, content) {
    const base64Img = content;
    const oA = document.createElement('a');
    oA.href = base64Img;
    oA.download = filename;
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    oA.dispatchEvent(event);
  }

  saveImgLocal() {
    this.createImg();
  }

  getLikeString(labels): string {
    if (labels) {
      const labelList = labels.split(',');
      return labelList[Math.round(Math.random() * (labelList.length - 1))];
    } else {
      return '';
    }
  }

  editArticle() {
    this.router.navigateByUrl(`/pages/update-aricle/${this.articleId}`);
  }
}
