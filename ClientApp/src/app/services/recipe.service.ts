import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';


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
}
