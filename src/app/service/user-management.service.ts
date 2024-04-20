import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentInjector, Injectable, runInInjectionContext } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IdName, PageDTO } from '../model/shared';
import { Role } from '../model/admin';
import { handleError } from '../core/configs/handleErrors';
import { RequestUser, SearchParams, UserDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private readonly PATH = `${environment.api}/user-management`
  constructor(
    private http: HttpClient,
    private injector: EnvironmentInjector
  ) { }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.PATH}/getRoles`)
      .pipe(
        catchError(error => {
          return runInInjectionContext(this.injector, () => handleError(error))
        })
      );
  }

  public saveUser(user: RequestUser): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.PATH}/createUser`, user)
      .pipe(
        catchError(error => runInInjectionContext(this.injector,() => handleError(error)))
      )
  }

  public search(params: SearchParams): Observable<PageDTO<UserDTO>>{
    let httpParams = new HttpParams();
    Object.keys(params).forEach( key => {
      if(params[key]){
        if(Array.isArray(params[key])){
          params[key].forEach(value => {
            httpParams = httpParams.append(key, value);
          });
        }else{
          httpParams = httpParams.set(key, params[key].toString());
        }
      }
    })

    return this.http.get<PageDTO<UserDTO>>(`${this.PATH}/search`, {params: httpParams})
    .pipe(
      catchError(error => runInInjectionContext(this.injector,() => handleError(error)))
    );
  }
}
