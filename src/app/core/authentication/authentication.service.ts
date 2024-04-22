import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly expireInKey = 'expire_in'
  constructor(
    private http: HttpClient
  ) { }


  login(email: string, password: string) {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', env.keycloakGrantType)
      .set('client_id', env.keycloakClientId);

    return this.http.post(env.keycloakTokenUrl, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      tap((response: any) => {
        this.storeTokens(response.access_token, response.refresh_token, response.expires_in)
      })
    );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey) || "";
    const body = new HttpParams()
      .set('refresh_token', refreshToken)
      .set('grant_type', this.refreshTokenKey)
      .set('client_id', env.keycloakClientId);

    return this.http.post(env.keycloakTokenUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      tap((response: any) => {
        this.storeTokens(response.access_token, response.refresh_token, response.expires_in);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.expireInKey);
  }

  checkIfUserIsLogged(): boolean {
    return localStorage.getItem(this.accessTokenKey) != undefined && localStorage.getItem(this.refreshTokenKey) != undefined;
  }

  private storeTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(this.expireInKey, expirationTime.toString());
  }
}
