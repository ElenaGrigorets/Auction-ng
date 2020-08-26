import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ItemListComponent } from "./item-list/item-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { ItemEditComponent } from "./item-edit/item-edit.component";




@NgModule({
  declarations: [
    ItemListComponent,
    ItemDetailsComponent,
    ItemEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'items', component: ItemListComponent },
      { path: 'items/:id', component: ItemDetailsComponent },
      { path: 'items/:id/edit', component: ItemEditComponent }
    ])
  ]
})
export class ItemModule { }
