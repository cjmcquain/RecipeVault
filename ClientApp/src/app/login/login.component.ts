import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
/** login component*/
export class LoginComponent {
  private user: User;
  errors: string[] = [];

  /** login ctor */
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.user = {
      userId: 0,
      username: '',
      password: '',
    }
  }

  loginUser() {
    try {
      this.authService.loginUser(this.user).subscribe(res => {
        if (res) {
          this.authService.currentUser = res as User;
          sessionStorage.setItem('currentUser', JSON.stringify(this.authService.currentUser));
          location.replace('/');
          console.log(this.authService.currentUser);
        }
      });
    }
    catch {
      this.errors.push('Invalid username and/or password');
    }
  }
}
