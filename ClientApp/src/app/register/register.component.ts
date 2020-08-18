import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
/** register component*/
export class RegisterComponent {
/** register ctor */

  newUser: User;
  confirmedPassword: string;
  errors: string[] = [];

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.newUser = {
      userID: 0,
      username: '',
      password: '',
    }
    this.confirmedPassword = '';
  }

  registerUser() {
    if (this.newUser.username == '' || this.newUser.password == '' || this.confirmedPassword == '') {
      this.errors.push('All fields are required.');
    } else if (this.newUser.username.length > 25) {
      this.errors.push('Username must be 25 characters or less.');
    } else if (this.newUser.password.length > 100) {
      this.errors.push('Password must be less than 100 characters.');
    } else if (this.confirmedPassword.length > 100) {
      this.errors.push('Confirmed password must be less than 100 characters.');
    } else if (this.newUser.password != this.confirmedPassword) {
      this.errors.push('Passwords do not match.');
    } else {
      this.authService.getUserByUsername(this.newUser.username).subscribe(res => {
        if (res) {
          this.errors.push('Username already exists.');
          return;
        } else {
          this.authService.registerUser(this.newUser).subscribe(res => {
            if (res) {
              sessionStorage.setItem('currentUser', JSON.stringify(res));
              this._snackBar.open('You have successfully registered. You are now logged in.', 'Dismiss', { duration: 2000, });
              location.replace('/');
            } else {
              this.errors.push('Error creating user');
            }
          });
        }
      });
    }
  }
}
