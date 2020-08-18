import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService, AuthService]
})
/** recipe-list component*/
export class RecipeListComponent {
  recipes: Recipe[];
  recipesDataSource;
  displayedColumns: string[] = ['title', 'ingredients', 'directions'];
  /** recipe-list ctor */
  constructor(private recipeService: RecipeService, private authService: AuthService) {
    
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res as Recipe[];
      this.recipesDataSource = new MatTableDataSource(this.recipes);
    });
  }
}
