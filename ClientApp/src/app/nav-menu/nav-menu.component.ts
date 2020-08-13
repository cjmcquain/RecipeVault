import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [AuthService]
})
export class NavMenuComponent {
  currentUser: User;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser');
  }

  logout() {
    this.authService.logout();
    location.replace('/');
  }
}
