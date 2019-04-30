import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { INDEX_URL } from './const';

@Injectable()
export class ManagerCanActivate implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const urls: string[] = state.url.split('/');
    // if (urls.length < 3) {
    //   this.router.navigateByUrl(INDEX_URL);
    //   return false;
    // } else {
    //   return this.loginService.getUser()
    //     .map(user => {
    //       if (user.permissionMap[urls[3]]) {
    //         return true;
    //       } else {
    //         this.router.navigateByUrl(INDEX_URL);
    //         return false;
    //       }
    //     });
    // }
    return true;
  }
}
