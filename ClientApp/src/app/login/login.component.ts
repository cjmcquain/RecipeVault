import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
/** login component*/
export class LoginComponent {
  user: User;
  errors: string[] = [];

  /** login ctor */
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.user = {
      userID: 0,
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
          this._snackBar.open('You are being logged in now.', 'Dismiss', { duration: 2000, });
          location.replace('/');
        } else {
          this.errors.push('Invalid username and/or password');
        }
      });
    }
    catch {
      this.errors.push('There was an issue logging in. Please try again later.');
    }
  }
}
