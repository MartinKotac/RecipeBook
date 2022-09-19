import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ActiveUsersComponent } from './exercise/active-users/active-users.component';
import { InactiveUsersComponent } from './exercise/inactive-users/inactive-users.component';
import {RecipeService} from "./shared/services/recipe.service";
import {ShoppingListService} from "./shared/services/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExerciseComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
