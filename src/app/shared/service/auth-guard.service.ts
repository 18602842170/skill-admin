import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { LOGIN_URL, TOKEN_NAME } from './const';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else if (this.loginService.getToken()) {
      this.loginService.verify(this.loginService.getToken())
        .subscribe(message => {
          if (message === 'success') {
            this.router.navigateByUrl(url);
          } else {

            // Store the attempted URL for redirecting
            this.authService.redirectUrl = url;

            // Navigate to the login page with extras
            this.router.navigateByUrl(LOGIN_URL);
            return false;
          }
        });
    } else {

      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigateByUrl(LOGIN_URL);
      return false;
    }
  }
}
