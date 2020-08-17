import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
import { User } from '../models/user';


@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [AuthService, RecipeService]
})
/** add-recipe component*/
export class AddRecipeComponent {
  categories: Category[];
  newRecipe: Recipe;
  currentUser: User;

  /** add-recipe ctor */
  constructor(private recipeService: RecipeService, private authService: AuthService, private _snackBar: MatSnackBar) {
    this.newRecipe = {
      recipeId: 0,
      title: '',
      ingredients: '',
      directions: '',
      categoryId: 0,
      pictureUrl: '',
      createDate: new Date,
      userId: 0
    }
  }

  ngOnInit() {
    this.recipeService.getCategories().subscribe(res => {
      this.categories = res as Category[];
      console.log(this.categories);
    })

    console.log(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.newRecipe.userId = this.currentUser.userId;
    }
    if (!this.currentUser) {
      location.replace('/login');
    }
  }
}
