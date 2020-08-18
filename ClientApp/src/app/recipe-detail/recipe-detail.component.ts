import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from '../models/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [RecipeService, AuthService]
})
/** recipe-detail component*/
export class RecipeDetailComponent {
  currentRecipe: Recipe;
  currentRecipeId: number;
  /** recipe-detail ctor */
  constructor(private recipeService: RecipeService, private authService: AuthService, private _snackBar: MatSnackBar, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentRecipeId = +params['id'];
    });

    this.recipeService.getRecipeById(this.currentRecipeId).subscribe(res => {
      this.currentRecipe = res as Recipe;
      console.log(this.currentRecipeId);
      console.log(this.currentRecipe);
    });
  }
}