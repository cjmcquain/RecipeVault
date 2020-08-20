import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedRecipe } from '../models/sharedrecipe';

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
  pendingRecipes: SharedRecipe[] = [];
  approvedRecipes: SharedRecipe[] = [];
  pendingRecipesList: Recipe[] = [];
  approvedRecipesList: Recipe[] = [];

  /** dashboard ctor */
  constructor(private authService: AuthService, private recipeService: RecipeService, private _snackBar: MatSnackBar) {
    this.currentUser = new User;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.authService.getProfileByUserId(this.currentUser.userID).subscribe(res => {
      this.currentProfile = res as Profile;
      if (this.currentUser) {
        this.recipeService.getRecipesByUserId(this.currentUser.userID).subscribe(res => {
          this.myRecipes = res as Recipe[];
          this.reloadShares(this.currentUser.userID);
        });
      }
    });
    
  }

  deleteRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId).subscribe(res => {
      if (res) {
        this._snackBar.open('You have successfully deleted the recipe.', 'Dismiss', { duration: 2000 });
        this.recipeService.getRecipesByUserId(this.currentUser.userID).subscribe(res => {
          this.myRecipes = res as Recipe[];
        })
      }
    });
  }

  reloadShares(userID: number) {
    this.pendingRecipes = [];
    this.approvedRecipes = [];
    this.pendingRecipesList = [];
    this.approvedRecipesList = [];
    this.recipeService.getPendingRecipes(userID).subscribe(res => {
      this.pendingRecipes = res as SharedRecipe[];
      this.recipeService.getApprovedRecipes(userID).subscribe(res => {
        this.approvedRecipes = res as SharedRecipe[];
        for (var i = 0; i < this.pendingRecipes.length; i++) {
          this.recipeService.getRecipeById(this.pendingRecipes[i].recipeId).subscribe(res => {
            var recipe = res as Recipe;
            this.pendingRecipesList.push(recipe);
          });
        }
        for (var i = 0; i < this.approvedRecipes.length; i++) {
          this.recipeService.getRecipeById(this.approvedRecipes[i].recipeId).subscribe(res => {
            var recipe = res as Recipe;
            this.approvedRecipesList.push(recipe);
          });
        }
      });
    });
  }

  approveShare(recipeId: number) {
    for (var i = 0; i < this.pendingRecipes.length; i++) {
      if (this.pendingRecipes[i].recipeId == recipeId) {
        this.recipeService.getSharedRecipeById(this.pendingRecipes[i].sharedRecipeId).subscribe(res => {
          var result = res as SharedRecipe;
          result.approved = 1;
          this.recipeService.approveShare(result.sharedRecipeId, result).subscribe(res => {
            this._snackBar.open('You have approved the shared recipe invitation.', 'Dismiss', { duration: 2000 });
            this.reloadShares(this.currentUser.userID);
          });
        });
      }
    }
  }
}
