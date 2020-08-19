import { Component } from '@angular/core';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [AuthService]
})
/** edit-profile component*/
export class EditProfileComponent {
  currentUser: any;
  currentProfile: Profile;
  error: string = '';
  /** edit-profile ctor */
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if (!JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.router.navigate(['login'])
    } else {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.authService.getProfileByUserId(this.currentUser.userID).subscribe(res => {
        this.currentProfile = res as Profile;
      });
    }
  }

  updateProfile() {
    try {
      this.authService.updateProfile(this.currentProfile.profileID, this.currentProfile).subscribe(res => {
        this._snackBar.open('You have successfully updated your profile.', 'Dismiss', { duration: 2000 });
        this.router.navigate(['dashboard']);
      });
    } catch {
      this.error = 'There was an error updating your profile. Please try again later.';
    }
  }
}
