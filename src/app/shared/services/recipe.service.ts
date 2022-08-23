import {Recipe} from "../models/recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('Omelette',
  //     'This is dummy desc',
  //     'https://cookieandkate.com/images/2018/08/crisp-apple-kohlrabi-salad-recipe-1.jpg',
  //     [
  //       new Ingredient("Eggs", 4),
  //       new Ingredient("Cheese", 2)
  //     ]),
  //   new Recipe('Hamburger',
  //     'hamburger test desc',
  //     'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("Buns", 2)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.onAddIngredientsFromRecipeService(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
