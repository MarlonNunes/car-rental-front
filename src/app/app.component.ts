import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav'
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, 
    SideBarComponent, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  isLoginPage: boolean = false;
  constructor(
    private router: Router
  ){
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.isLoginPage = event.url.includes("/login");
      }
    })
  }
  
  ngOnInit(): void {
  }
  title = 'car-rental-app';
}
