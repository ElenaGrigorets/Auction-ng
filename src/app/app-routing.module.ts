import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES = [
  { path: 'home', component: ItemComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
