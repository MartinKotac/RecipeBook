import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Pepper",10),
    new Ingredient("Apples",5)
  ]

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient){
    if(ingredient.name!=="") {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }
  onAddIngredientsFromRecipeService(ingredients:Ingredient[]){
    for(let ingred of ingredients){
      this.addIngredient(ingred);
    }
  }
  updateIngredient(index: number,newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next((this.ingredients.slice()));
  }

}
