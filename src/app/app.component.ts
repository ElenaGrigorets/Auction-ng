import {Component, OnInit} from '@angular/core';
import {ItemService} from "./items/item.service";
import {IItem} from "./items/IItem";
import {AuthService} from "./users/auth.service";
import {IUser} from "./users/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'auction-ng';
  searchTerm: string;
  foundItems: IItem[];
  user: IUser;

  constructor(private itemService: ItemService, private auth: AuthService, private router: Router) {
  }
  searchItems(searchTerm) {
    this.itemService.searchItems(searchTerm).subscribe
    (items => {
      this.foundItems = items;
    });
  }

  ngOnInit(): void {
    this.auth.checkAuthenticationStatus().subscribe(value => {
      if (value === null) {
        this.router.navigate(['/users/login']);
      }
    });
  }
}
