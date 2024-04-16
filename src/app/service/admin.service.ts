import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IdName } from '../model/shared';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllRoles(): Observable<IdName[]> {
    return this.http.get<IdName[]>(`${environment.api}/admin/getRoles`);
  }
}
