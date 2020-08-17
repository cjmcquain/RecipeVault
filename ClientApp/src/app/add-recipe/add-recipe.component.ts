import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
import { User } from '../models/user';
import { Router } from '@angular/router';


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
  errors: string[] = [];
  message: string = '';

  /** add-recipe ctor */
  constructor(private recipeService: RecipeService, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {
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
    
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.newRecipe.userId = this.currentUser.userID;
    }
  }

  ngOnInit() {
    this.recipeService.getCategories().subscribe(res => {
      this.categories = res as Category[];
    })


    if (!this.currentUser) {
      location.replace('/login');
    }
  }

  onSubmit() {
    this.errors = [];
    this.message = '';
    if (this.newRecipe.title == '') {
      this.errors.push('Title is required');
    }
    if (this.newRecipe.ingredients == '') {
      this.errors.push('Ingredients are required');
    }
    if (this.newRecipe.directions == '') {
      this.errors.push('Directions are required');
    }
    if (this.newRecipe.categoryId == 0) {
      this.errors.push('Category is required');
    }
    if (this.newRecipe.pictureUrl.length > 0) {
      if (!this.isValidUrl(this.newRecipe.pictureUrl)) {
        this.errors.push('Please enter a valid URL for Recipe Photo');
      }
    }

    if (this.errors.length > 0) {
      return;
    } else {
      this.addRecipe(this.newRecipe);
    }
  }

  isValidUrl(url: string) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
      return true;
    }
    return false;
  }

  addRecipe(recipe: Recipe) {
    recipe.createDate = new Date();
    this.recipeService.addRecipe(recipe).subscribe(res => {
      if (res) {
        this._snackBar.open('You have successfully added the recipe.', 'Dismiss', { duration: 2000, });
        this.router.navigate(['recipes']);
        this.newRecipe = {
          recipeId: 0,
          title: '',
          ingredients: '',
          directions: '',
          categoryId: 0,
          pictureUrl: '',
          createDate: new Date,
          userId: this.currentUser.userID
        }
      } else {
        this._snackBar.open('There was an error adding the recipe.', 'Dismiss', { duration: 2000, });
      }


    });
  }
}
