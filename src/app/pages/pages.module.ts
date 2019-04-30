import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NgZorroAntdModule, NzNotificationService } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchListComponent } from './searchList/searchList.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from '../shared/service/article/article.service';
import { CreateAricleComponent } from './createAricle/createAricle.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from '../shared/service/login.service';
import { UserService } from '../shared/service/users/user.service';
import { AuthGuard } from '../shared/service/auth-guard.service';
import { AuthService } from '../shared/service/auth.service';
import { AricleDrawerComponent } from './createAricle/aricle-drawer/aricle-drawer.component';
import { CommentService } from '../shared/service/article/comment.service';
import { FileuploadService } from '../shared/service/fileupload.service';





@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    SearchListComponent,
    ArticleComponent,
    CreateAricleComponent,
    LoginComponent,
    AricleDrawerComponent,
  ],
  entryComponents: [
    AricleDrawerComponent,
  ],
  providers: [
    ArticleService,
    LoginService,
    UserService,
    AuthGuard,
    AuthService,
    CommentService,
    FileuploadService,
  ],
})
export class PagesModule {
}
