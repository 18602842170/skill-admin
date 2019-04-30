import { Injectable } from '@angular/core';
import { INDEX_URL } from './const';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string = INDEX_URL;
}
