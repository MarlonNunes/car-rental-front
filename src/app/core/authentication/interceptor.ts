import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { catchError, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isLoginEndpoint = req.url.includes("/login");
  if(!isLoginEndpoint){
  const token = localStorage.getItem('access_token');
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  }

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {

      if (error.status === 401 && !isLoginEndpoint) {
        // Unauthorized - JWT Token expired    
        return authService.refreshToken().pipe(
          switchMap((tokenReceived) => {
            let token: String = tokenReceived.access_token;
            if (token != '') {
              req = req.clone({
                setHeaders: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              })
            }
            return next(req);
          }),
          catchError(err => {
            router.navigateByUrl("/logout");
            return throwError(() => error);
          })
        );
      }else{
        return throwError(() => error);
      }
    })
  );
};