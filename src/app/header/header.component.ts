import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserRoleService} from '../users/shared/user-role.service';
import {NavigationService} from '../shared/navigation.service';
import {UserService} from '../users/shared/user.service';

@Component({
  selector: 'shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean;
  userRole: string;

  constructor(
    private router: Router,
    private userRoleService: UserRoleService,
    private navigation: NavigationService,
  ) {
    this.navigation = new NavigationService(this.router);
  }

  ngOnInit(): void {
    this.logged = UserService.isUserLogged();
    this.userRole = UserRoleService.getRoleOfCurrentUser();
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  onClickButton(endpoint: string): void {
    if (endpoint === '/sign-out') {
      this.onSignOut();
      return;
    }

    this.navigation.goToEndpoint(endpoint);
  }

  private onSignOut() {
    UserService.setCurrentUserId('0');
    UserRoleService.setRoleOfCurrentUser('');
    this.logged = !this.logged;
    this.navigation.goToEndpoint('/');
  }
}
