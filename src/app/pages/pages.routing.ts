import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchListComponent } from './searchList/searchList.component';
import { ArticleComponent } from './article/article.component';
import { CreateAricleComponent } from './createAricle/createAricle.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/service/auth-guard.service';
export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'search/:searchStr',
        component: SearchListComponent
      },
      {
        path: 'article/:articleId',
        component: ArticleComponent
      },
      {
        path: 'create-aricle',
        canActivate: [AuthGuard],
        component: CreateAricleComponent
      },
      {
        path: 'update-aricle/:articleId',
        canActivate: [AuthGuard],
        component: CreateAricleComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
