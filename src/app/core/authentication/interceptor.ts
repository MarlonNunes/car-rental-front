import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { catchError, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  const authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError(error => {

      if (error.status === 401 && !req.url.includes("/login")) {
        // Unauthorized - JWT Token expired    
        return authService.refreshToken().pipe(
          switchMap((tokenReceived) => {
            console.log(tokenReceived);
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
          }
        ));
      }else{
        return throwError(() => error);
      }
    })
  );
};