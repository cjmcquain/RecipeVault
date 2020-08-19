import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from '../services/recipe.service';
import { Category } from '../models/category';

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
  providers: [AuthService, RecipeService]
})
/** edit-recipe component*/
export class EditRecipeComponent {
  currentRecipeId: number;
  currentRecipe: any;
  currentUser: any;
  categories: Category[];
  errors: string[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private recipeService: RecipeService) {

  }

  ngOnInit() {
    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
    } else {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    this.route.params.subscribe(params => {
      this.currentRecipeId = +params['id'];
      this.recipeService.getRecipeById(this.currentRecipeId).subscribe(res => {
        this.currentRecipe = res;
        if (this.currentRecipe.userID !== this.currentUser.userID) {
          this.router.navigate(['login']);
        }
        this.recipeService.getCategories().subscribe(res => {
          this.categories = res as Category[];
        })
        console.log(this.currentUser);
        console.log(this.currentRecipe);
        console.log(this.currentRecipeId);
      });
    });
  }

  updateRecipe() {
    this.errors = [];
    if (this.currentRecipe.title == '') {
      this.errors.push('Title is required');
    }
    if (this.currentRecipe.ingredients == '') {
      this.errors.push('Ingredients are required');
    }
    if (this.currentRecipe.directions == '') {
      this.errors.push('Directions are required');
    }
    if (this.currentRecipe.categoryId == 0) {
      this.errors.push('Category is required');
    }
    if (this.currentRecipe.pictureURL.length > 0) {
      if (!this.isValidUrl(this.currentRecipe.pictureURL)) {
        this.errors.push('Please enter a valid URL for Recipe Photo');
      }
    }

    if (this.errors.length > 0) {
      return;
    } else {
      try {
        this.recipeService.updateRecipe(this.currentRecipeId, this.currentRecipe).subscribe(res => {
          this._snackBar.open('You have successfully udpated the recipe.', 'Dismiss', { duration: 2000, });
          this.router.navigate(['dashboard']);
        });
      } catch {
        this.errors.push('There was an error updating the recipe. Please try again later.');
      }
    }
  }

  isValidUrl(url: string) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
      return true;
    }
    return false;
  }
}
