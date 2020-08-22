import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IItem} from "./IItem";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Array<IItem>> {
    return this.http.get<Array<IItem>>('http://localhost:3000/items');
  }
}
