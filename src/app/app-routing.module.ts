import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesStartComponent} from "./recipes/recipes-start/recipes-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./shared/services/recipe-resolver.service";



const appRoutes:Routes = [
  {path: '', redirectTo: '/recipes' ,pathMatch: 'full'},
  {path: 'recipes', component:RecipesComponent, children:[
      {path: '', component: RecipesStartComponent},
      {path: 'new', component:RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
  {path: 'shopping-list', component:ShoppingListComponent},
  {path:'**',redirectTo: '/recipes'}

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}