import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/api', 'signin']);
      return false;
    } else {
      return true;
    }
  }

}
