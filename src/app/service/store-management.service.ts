import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestStore, StoreDetails, StoreParams } from '../model/store';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../core/configs/handleErrors';
import { PageDTO } from '../model/shared';

@Injectable({
  providedIn: 'root'
})
export class StoreManagementService {
  

  private readonly PATH = `${environment.api}/admin/store-management`;
  
  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector
  ) { }

  public createStore(store: RequestStore): Observable<StoreDetails>{
    return this.http.post<StoreDetails>(`${this.PATH}/create`, store)
    .pipe(
      catchError(error => runInInjectionContext(this.injector, () => handleError(error)))
    )
  }

  updateStore(store: RequestStore): Observable<StoreDetails> {
    return this.http.put<StoreDetails>(`${this.PATH}/update`, store)
    .pipe(
      catchError(error => runInInjectionContext(this.injector, () => handleError(error)))
    )
  }

  public search(filter: StoreParams): Observable<PageDTO<StoreDetails>>{
    return this.http.get<PageDTO<StoreDetails>>(`${this.PATH}/search`)
    .pipe(
      catchError(error => runInInjectionContext(this.injector, () => handleError(error)))
    )
  }

  public getStoreDetails(id: number): Observable<StoreDetails>{
    return this.http.get<StoreDetails>(`${this.PATH}/${id}`)
      .pipe(
        catchError(error => runInInjectionContext(this.injector, () => handleError(error)))
      )
  }


}
