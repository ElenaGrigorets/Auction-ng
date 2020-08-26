import { Component, OnInit, ViewChild} from '@angular/core';
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
    this.route.data.forEach((data) => {
      this.item = data['item'];
    });
  }

  deleteItem(): void {

  }

  saveItem(): void {
    if (this.isValid()) {
      if (this.item.id === '0') {
        this.itemService.createItem(this.item).subscribe({
          error: err => this.errorMessage = err,
          next: () => this.onSaveComplete(`The new` + this.item.name + `was saved`)
        });
      } else {
        this.itemService.updateItem(this.item).subscribe({
          error: err => this.errorMessage = err,
          next: () => this.onSaveComplete(`The updated` + this.item.name + `was saved`)
        });
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
    return false;
  }
}
