import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../models/recipe.model";
import {RecipeService} from "./recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://ng-course-recipe-book-c1c49-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-c1c49-default-rtdb.firebaseio.com/recipes.json?auth='+user.token,
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
