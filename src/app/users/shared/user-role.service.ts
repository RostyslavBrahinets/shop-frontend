import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from './user.model';
import {UserRoleDto} from './user-role.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private apiUrl = 'http://localhost:8080/user-role';

  constructor(
    private http: HttpClient
  ) {
  }

  static getRoleOfCurrentUser(): string {
    return Cookie.get('userRole');
  }

  getUsersRoles(): Observable<UserRoleDto[]> {
    return this.http.get<UserRoleDto[]>(this.apiUrl);
  }

  getRoleForUser(userId: number): Observable<UserRoleDto> {
    return this.http.get<UserRoleDto>(`${this.apiUrl}/${userId}`);
  }

  saveRoleForUser(user: User): Observable<UserRoleDto> {
    const userRole = new UserRoleDto();

    this.getUsersRoles().subscribe(
      (roleUsersRoles) => userRole.id = (roleUsersRoles.length as number) + 1
    );

    userRole.roleId = 2;
    userRole.userId = user.id;

    return this.http.post<UserRoleDto>(this.apiUrl, userRole, httpOptions);
  }
}
