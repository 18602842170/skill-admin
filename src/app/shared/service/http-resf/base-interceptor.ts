import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError, retry, mergeMap } from 'rxjs/operators';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from '../const';
import { Router } from '@angular/router';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private message: NzMessageService,
        private _notification: NzNotificationService, ) { }

    intercept(req, next: HttpHandler) {
        const newReq = req.clone({
            url: req.hadBaseurl ? `${req.url}` : `${BASE_URL}${req.url}`,
        });
        /*此处设置额外的头部，token常用于登陆令牌*/
        if (!req.cancelToken && localStorage.getItem(TOKEN_NAME)) {
            /*token数据来源自己设置，我常用localStorage存取相关数据*/
            newReq.headers =
                newReq.headers.set('Authorization', `lbr ${localStorage.getItem(TOKEN_NAME)}`);
        }

        // send cloned request with header to the next handler.
        return next.handle(newReq)
            .pipe(
                /*失败时重试2次，可自由设置*/
                retry(0),
                mergeMap((event: any) => {
                    // 正常返回，处理具体返回参数
                    if (event instanceof HttpResponse && event.status === 200) {
                        // 具体处理请求返回数据
                        return this.handleData(event);
                    } else {
                        return of(event);
                    }
                }),
                /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/
                catchError(error => {
                    return this.handleError(error);
                })
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 403) {
            localStorage.clear();
            this._notification.create('error', '登录超时', '请重新登录');
            this.router.navigateByUrl(`/pages/login`);
        }
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        if (event['body']) {
            switch (event['body']['code']) {
                case '1000000':
                    this._notification.create('error', '登录超时', '请重新登录');
                    this.router.navigateByUrl(LOGIN_URL);
                    return throwError(
                        'login error');
                case '1000003':
                    this.message.create('error', '操作失败');
                    return throwError(
                        'service error');
                case '1000011':
                    this.message.create('error', '数据库连接失败');
                    return throwError(
                        'service error');
                case '1000012':
                    this.message.create('error', '数据库操作失败');
                    return throwError(
                        'service error');
                default:
                    return of(event);

            }
        } else {
            return of(event);
        }
    }

    private writeIntoLog() {

    }
}
