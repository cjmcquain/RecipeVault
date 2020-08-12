import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../services/auth.service"
import { User } from '../models/user';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  currentUser: User;

  @Output() sidenavClose = new EventEmitter();

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
  }

  /**event handler, closes sidenav */
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  /**calls service to log user out of session */
  logout(): void {
    this.authService.logout();
    location.replace('/');
  }

}
