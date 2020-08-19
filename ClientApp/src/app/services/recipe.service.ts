import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { SharedRecipe } from '../models/sharedrecipe';


@Injectable()
export class RecipeService {
  readonly rootURL;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.rootURL = baseUrl + 'api';
  }

  getCategories() {
    return this.http.get(this.rootURL + '/Categories');
  }

  addRecipe(recipe: Recipe) {
    return this.http.post(this.rootURL + '/Recipes', recipe);
  }

  getRecipeById(id: number) {
    return this.http.get(this.rootURL + '/Recipes/' + id);
  }

  getRecipes() {
    return this.http.get(this.rootURL + '/Recipes');
  }

  getRecipesByUserId(id: number) {
    return this.http.get(this.rootURL + '/Recipes/GetRecipesByUserId/' + id);
  }

  updateRecipe(recipeId: number, updatedRecipe: Recipe) {
    return this.http.put(this.rootURL + '/Recipes/' + recipeId, updatedRecipe);
  }

  deleteRecipe(recipeId: number) {
    return this.http.delete(this.rootURL + '/Recipes/' + recipeId);
  }

  sendSharedRecipe(sharedRecipe: SharedRecipe) {
    return this.http.post(this.rootURL + '/SharedRecipes', sharedRecipe);
  }
}
