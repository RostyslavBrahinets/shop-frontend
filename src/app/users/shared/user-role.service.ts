import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRoleDto} from './UserRoleDto';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private apiUrl = 'http://localhost:8080/user-role';

  constructor(
    private http: HttpClient
  ) {
  }

  getRoleForUser(userId: number): Observable<UserRoleDto> {
    return this.http.get<UserRoleDto>(`${this.apiUrl}/${userId}`);
  }
}
