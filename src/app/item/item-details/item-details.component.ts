import { Component, OnInit } from '@angular/core';
import {IItem} from '../IItem';
import {ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: IItem;
  constructor(private itemService: ItemService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemService.findItemById(itemId).subscribe(item => {
      this.item = item;
    });
  }

}
