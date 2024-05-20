import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreatePasswordRequest } from '../model/login';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../core/configs/handleErrors';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly PATH = `${environment.api}/login`;
  
  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector
  ) { }

  public createPassword(createPassword: CreatePasswordRequest): Observable<void>{
    return this.http.post<void>(`${this.PATH}/createPassword`, createPassword)
    .pipe(
      catchError(error => runInInjectionContext(this.injector,() => handleError(error)))
    );;
  } 
}
