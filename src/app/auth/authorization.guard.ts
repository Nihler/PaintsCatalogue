import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let username = '';
    const urlUsername = route.params['userId'];
    this.authService.getUsernameListener().subscribe((data) => {
      username = data;
    });
    if (username != urlUsername) {
      this.router.navigate(['/user/inventory/' + urlUsername]);
      return false;
    }

    return true;
  }
}
