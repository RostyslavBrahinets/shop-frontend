import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoggedUserService} from '../users/shared/logged-user.service';
import {NavigationService} from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.navigationService = new NavigationService(router);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const authorized = LoggedUserService.getUserId() > 0;
    const roleUser = LoggedUserService.getRoleOfUser() === 'ROLE_USER';

    if (!authorized) {
      this.navigationService.goToEndpoint('/sign-in');
      return false;
    } else if (!roleUser) {
      this.navigationService.goToEndpoint('/page-not-found');
      return false;
    }

    return true;
  }
}
