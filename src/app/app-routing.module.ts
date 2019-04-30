import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pages/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' }];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
