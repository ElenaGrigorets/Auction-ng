import { Component, OnInit } from '@angular/core';
import { IItem } from '../IItem';
import { ItemService } from '../item.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Array<IItem> = [];

  constructor(private itemService: ItemService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(item => {
      this.items = item;
    });
  }

}
