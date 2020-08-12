import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  readonly rootURL;
  public currentUser: User;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.rootURL = baseUrl + 'api';
  }


  logout() {

  }
}
