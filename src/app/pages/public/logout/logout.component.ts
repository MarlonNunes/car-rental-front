import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: "",
})
export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expire_in');
    this.router.navigateByUrl('/login');

  }
}
