import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../users/shared/user.service';
import {User} from '../users/shared/user.model';
import {UserRoleService} from '../users/shared/user-role.service';

@Component({
  selector: 'shop-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.isValidDataForSignUp()) {
      return;
    }

    this.userService.getUsers().subscribe(
      (users) => {
        const id = (users.length as number) + 1;

        const newUser: User = {
          id: id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password
        };

        this.userService.saveUser(newUser).subscribe();
        this.userRoleService.saveRoleForUser(newUser).subscribe();
      }
    );

    this.router.navigate(['/sign-in']).then();
  }

  private isValidDataForSignUp(): boolean {
    if (!this.firstName) {
      alert('You haven\'t entered a first name');
      return;
    }

    if (!this.lastName) {
      alert('You haven\'t entered a last name');
      return false;
    }

    if (!this.email) {
      alert('You haven\'t entered a email');
      return false;
    }

    if (!this.phone) {
      alert('You haven\'t entered a phone');
      return false;
    }

    if (!this.password) {
      alert('You haven\'t entered a password');
      return false;
    }

    if (!this.confirmPassword) {
      alert('You haven\'t entered a confirm password');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      alert('Your passwords are different');
      return false;
    }

    return true;
  }
}
