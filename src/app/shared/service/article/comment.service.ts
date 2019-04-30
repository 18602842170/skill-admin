import { Injectable, Inject } from '@angular/core';
import { QueryResults, IQuery } from '../interface';
import { HttpClient } from '@angular/common/http';
import { toConnet } from '../base.service';
import { IArticle } from './article.service';

export interface ICommentQuery extends IQuery {
  id?: number;
  article?: number;
}

export interface IComment {
  id?: number;
  message?: string;
  rate?: number;
  likes?: number;
  dislikes?: number;
  article?: number | IArticle;
  create_time?: Date;
  modify_time?: Date;
}

@Injectable()
export class CommentService {

  url = `/article/comment`;

  constructor(
    private http: HttpClient,
  ) { }

  // id查询
  get(id: number) {
    return this.http.get<IComment>(`${this.url}/${id}`);
  }

  // 条件查询
  query(commentQuery?: ICommentQuery) {
    const query = toConnet(commentQuery);
    return this.http.get<QueryResults<IComment>>(`${this.url}?${query}`);
  }

  // 新建
  create(comment: IComment) {
    return this.http.post<IComment>(`${this.url}`, comment);
  }

  // 更新
  update(comment: IComment) {
    return this.http.put<IComment>(`${this.url}/${comment.id}`, comment);
  }

  // 删除
  delete(id: number) {
    return this.http.delete<IComment>(`${this.url}/${id}`);
  }

}
