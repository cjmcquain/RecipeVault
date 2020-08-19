import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Profile } from '../models/profile';

@Injectable()
export class AuthService {
  readonly rootURL;
  public currentUser: User;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.rootURL = baseUrl + 'api';
  }

  loginUser(user: User) {
    return this.http.post(this.rootURL + '/Users/AuthUser', user);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    location.replace('/');
  }

  registerUser(newUser: User) {
    return this.http.post(this.rootURL + '/Users', newUser);
  }

  registerProfile(newProfile: Profile) {
    return this.http.post(this.rootURL + '/Profiles', newProfile);
  }

  getProfileByUserId(userId: number) {
    return this.http.get(this.rootURL + '/Profiles/GetProfileByUserId/' + userId);
  }

  getUserByUsername(username: string) {
    return this.http.get(this.rootURL + '/Users/GetUserByUsername/' + username);
  }

  updateProfile(profileId: number, updatedProfile: Profile) {
    return this.http.put(this.rootURL + '/Profiles/' + profileId, updatedProfile);
  }
}
