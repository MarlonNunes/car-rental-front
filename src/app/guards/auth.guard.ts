import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const accessToken = localStorage.getItem("access_token");
  const expireInString = localStorage.getItem("expire_in");

  if(!accessToken || !expireInString){
    router.navigateByUrl("/login");
    return false;
  }

  const expireInDate = new Date(expireInString);
  const currentDate = new Date();

  if(currentDate > expireInDate){
    return false;
  }

  return true;
};
