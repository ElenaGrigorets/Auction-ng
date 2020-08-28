import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
  pageTitle: '';
  errorMessage: string;
  item: IItem;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id === '0') {
      this.item = new IItem();
      this.item.id = '0';
    }
    this.itemService.findItemById(id).subscribe
    (item => {
      this.item = item;
      console.log(item);
    });
  }

  deleteItem() {
    this.itemService.deleteItem(this.item.id).subscribe();
    this.onSaveComplete("Deleted");
  }

  saveItem(): void {
    if (this.isValid()) {
      console.log('dddd' + this.item);
      if (this.item.id === '0') {
        this.itemService.createItem(this.item).subscribe();
        this.onSaveComplete("Created");
      } else {
        this.itemService.updateItem(this.item).subscribe();
        this.onSaveComplete("Updated")
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message): void {
    console.log(message);

    // Navigate back
    this.router.navigate(['/items']);
  }

  isValid() {
    return true;
  }
}
