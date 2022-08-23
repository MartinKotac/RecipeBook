import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/models/ingredient.model";
import {ShoppingListService} from "../../shared/services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })

    })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;

    const ingredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
