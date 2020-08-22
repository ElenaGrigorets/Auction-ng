import { Component, OnInit } from '@angular/core';
import {IItem} from "./IItem";
import {ItemService} from "./item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Array<IItem> = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(item => {
      this.items = item;
    });
  }

}
