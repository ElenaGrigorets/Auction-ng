import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IItem } from "../IItem";
import { ItemService } from '../item.service';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  // @ViewChild(NgForm)
  itemForm: NgForm;

  errorMessage: string;
  item: IItem;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.route.parent.data.subscribe(data => {
    //   if (this.itemForm) {
    //     this.itemForm.reset();
    //   }
    //
    //   this.items = data['resolvedData'].items;
    // });

  }
}
