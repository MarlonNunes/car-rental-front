import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: "",
})
export class LogoutComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {
   
    this.authService.logout();
    this.router.navigateByUrl('/login');

  }
}
