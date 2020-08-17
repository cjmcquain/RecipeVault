import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RecipeService {
  readonly rootURL;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.rootURL = baseUrl + 'api';
  }

  getCategories() {
    return this.http.get(this.rootURL + '/Categories');
  }
}
