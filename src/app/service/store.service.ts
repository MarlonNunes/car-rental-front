import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly PATH = `${environment.api}/`
  constructor(
    private readonly http: HttpClient
  ) { }


}
