import { Injectable, Inject } from '@angular/core';
import { QueryResults, IQuery } from '../interface';
import { HttpClient } from '@angular/common/http';
import { toConnet } from '../base.service';

export interface IArticleQuery extends IQuery {
  id?: number;
  search?: string;
  is_delete?: boolean;
}

export interface IArticle {
  id?: number;
  title?: string;
  outline?: string;
  readCount?: number;
  label?: string;
  content?: any[];
  create_time?: Date;
  modify_time?: Date;
}


@Injectable()
export class ArticleService {

  url = `/article/article`;

  constructor(
    private http: HttpClient,
  ) { }

  // id查询
  get(id: number) {
    return this.http.get<IArticle>(`${this.url}/${id}`);
  }

  // 条件查询
  query(articleQuery?: IArticleQuery) {
    const query = toConnet(articleQuery);
    return this.http.get<QueryResults<IArticle>>(`${this.url}?${query}`);
  }

  // 新建
  create(article: IArticle) {
    return this.http.post<IArticle>(`${this.url}`, article);
  }

  // 更新
  update(article: IArticle) {
    return this.http.put<IArticle>(`${this.url}/${article.id}`, article);
  }

  // 删除
  delete(id: number) {
    return this.http.delete<IArticle>(`${this.url}/${id}`);
  }

}
