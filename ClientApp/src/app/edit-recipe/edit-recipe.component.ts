import { Component } from '@angular/core';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
  providers: [AuthService]
})
/** edit-recipe component*/
export class EditRecipeComponent {


  constructor(private authService: AuthService) {

  }

}
