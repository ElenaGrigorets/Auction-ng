import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';

const routes: Routes = [
  { path: '', component: ItemComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
