import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { User } from '../models/user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
/** dashboard component*/
export class DashboardComponent {
  currentProfile: Profile;
  currentUser: User;
  /** dashboard ctor */
  constructor(private authService: AuthService) {
    this.currentUser = new User;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.authService.getProfileByUserId(this.currentUser.userID).subscribe(res => {
      this.currentProfile = res as Profile;
      console.log(this.currentUser);
      console.log(this.currentProfile);
    });
  }
}
