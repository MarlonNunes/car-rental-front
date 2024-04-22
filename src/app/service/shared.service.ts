import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViaCepDetails } from '../model/shared';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }


  public searchZipCodeInfo(zipCode: string): Observable<ViaCepDetails>{
    return this.http.get<ViaCepDetails>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }
}
