import { Component } from '@angular/core';
import {ItemService} from "./items/item.service";
import {IItem} from "./items/IItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction-ng';
  searchTerm: string;
  foundItems: IItem[];

  constructor(private itemService: ItemService) {
  }
  searchItems(searchTerm) {
    this.itemService.searchItems(searchTerm).subscribe
    (items => {
      this.foundItems = items;
    });
  }
}
