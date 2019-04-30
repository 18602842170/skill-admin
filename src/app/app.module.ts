import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import * as Raven from 'raven-js';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import zh from '@angular/common/locales/zh';
import { httpInterceptorProviders } from './shared/service/http-resf/http-index';

registerLocaleData(zh);

// Raven
//   .config('http://2feb6c16bdfa4f499fb70568ab076be6@sentry.librichenzq.cn/3')
//   .install();

// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     Raven.captureException(err);
//   }
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    httpInterceptorProviders,
    // { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
