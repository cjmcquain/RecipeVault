import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService, RecipeService]
})
/** dashboard component*/
export class DashboardComponent {
  currentProfile: Profile;
  currentUser: User;
  myRecipes: Recipe[] = [];

  /** dashboard ctor */
  constructor(private authService: AuthService, private recipeService: RecipeService) {
    this.currentUser = new User;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.authService.getProfileByUserId(this.currentUser.userID).subscribe(res => {
      this.currentProfile = res as Profile;
      if (this.currentUser) {
        this.recipeService.getRecipesByUserId(this.currentUser.userID).subscribe(res => {
          this.myRecipes = res as Recipe[];
        });
      }
    });
    
  }
}
