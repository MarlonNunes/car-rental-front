import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable, runInInjectionContext } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IdName } from '../model/shared';
import { Role } from '../model/admin';
import { handleError } from '../core/configs/handleErrors';
import { RequestUser, UserDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private http: HttpClient,
    private injector: EnvironmentInjector
  ) { }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.api}/user-management/getRoles`)
      .pipe(
        catchError(error => {
          return runInInjectionContext(this.injector, () => handleError(error))
        })
      );
  }

  public saveUser(user: RequestUser): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${environment.api}/user-management/createUser`, user)
      .pipe(
        catchError(error => runInInjectionContext(this.injector,() => handleError(error)))
      )
  }
}
