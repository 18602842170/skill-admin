import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, TOKEN_NAME } from '../const';
import { QueryResults, IQuery } from '../interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface IUsersQuery extends IQuery {
  id?: number;
}

export interface IUsers {
  id?: number;
  name?: string;
  phone_number?: number;
  uuid?: string;
  token?: string;
  phoneNumber?: string;
}

@Injectable()
export class UserService {

  url = `/user`;

  constructor(
    private http: HttpClient,
  ) { }

  // id查询
  get(id: number) {
    return this.http.get<IUsers>(`${this.url}/${id}`);
  }

  // 条件查询
  query(userQuery: IUsersQuery) {
    return this.http.patch<QueryResults<IUsers>>(`${this.url}`, userQuery);
  }

  // 新建IUsers
  create(user: IUsers) {
    return this.http.post<IUsers>(`${this.url}`, user);
  }

  // 更新
  update(user: IUsers) {
    return this.http.put<IUsers>(`${this.url}/${user.id}`, user);
  }

  // 删除
  delete(id: number) {
    return this.http.delete<IUsers>(`${this.url}/${id}`);
  }

  // 用户session验证
  getUserBySessionId(id: string) {
    return this.http.get<IUsers>(`${this.url}/getUserBySessionId/${id}`);
  }

  sendCode(id: number): Observable<IUsers> {

    return this.http.post(`${BASE_URL}/user/sendCode`, {
      id: id
    }).pipe(
      map((response: any) => response.json())
    );
  }
}
