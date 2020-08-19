import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from '../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { SharedRecipe } from '../models/sharedrecipe';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [RecipeService, AuthService]
})
/** recipe-detail component*/
export class RecipeDetailComponent {
  currentRecipe: any;
  currentRecipeId: number;
  currentUser: User;
  ownsRecipe: boolean;
  sharedUsername: string = '';
  sharedRecipe: SharedRecipe;
  error: string = '';
  message: string = '';
  /** recipe-detail ctor */
  constructor(private recipeService: RecipeService, private authService: AuthService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentRecipeId = +params['id'];
    });

    this.recipeService.getRecipeById(this.currentRecipeId).subscribe(res => {
      this.currentRecipe = res;
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (this.currentUser) {
        if (this.currentRecipe.userID == this.currentUser.userID) {
          this.ownsRecipe = true;
        } else {
          this.ownsRecipe = false;
        }
      }
      this.sharedRecipe = {
        sharedRecipeId: 0,
        recipeId: 0,
        toUserId: 0,
        fromUserId: this.currentUser.userID,
        approved: 0
      }
    });
  }

  deleteRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId).subscribe(res => {
      if (res) {
        this._snackBar.open('You have successfully deleted the recipe', 'Dismiss', { duration: 2000 });
        this.router.navigate(['dashboard']);
      }
    });
  }

  submitShare() {
    this.authService.getUserByUsername(this.sharedUsername).subscribe(res => {
      if (res) {
        var sharedUser = res as User;
        this.sharedRecipe.recipeId = this.currentRecipeId;
        this.sharedRecipe.toUserId = sharedUser.userID;
        this.recipeService.sendSharedRecipe(this.sharedRecipe).subscribe(res => {
          if (res) {
            this.error = '';
            this.message = 'You have successfully shared the recipe.';
            this.sharedUsername = '';
          }
        });
      } else {
        this.error = 'Username does not exist. Please enter valid username.';
      }
    });

  }
}
