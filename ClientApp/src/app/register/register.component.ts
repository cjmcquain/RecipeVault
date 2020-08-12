import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
/** register component*/
export class RegisterComponent {
/** register ctor */

  newUser: User;
  confirmedPassword: string;
  errors: string[] = [];

  constructor() {

  }

  ngOnInit() {
    this.newUser = {
      userId: 0,
      username: '',
      password: '',
    }
    this.confirmedPassword = '';
  }

  registerUser() {
    console.log('Username: ' + this.newUser.username);
    console.log('Password: ' + this.newUser.password);
    console.log('Confirmed Password: ' + this.confirmedPassword);
    if (this.newUser.password == this.confirmedPassword) {
      console.log('Passwords match!');
    } else {
      this.errors.push('Passwords do not match.');
    }


    if (this.newUser.username == '' || this.newUser.password == '' || this.confirmedPassword == '') {
      this.errors.push('All fields are required.');
    } else if (this.newUser.username.length > 25) {
      this.errors.push('Username must be 25 characters or less.');
    } else if (this.newUser.password.length > 100) {
      this.errors.push('Password must be less than 100 characters.');
    } else if (this.confirmedPassword.length > 100) {
      this.errors.push('Confirmed password must be less than 100 characters.');
    } else if ()
  }
}
