import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IItem} from './IItem';
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private handleError: any;

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Array<IItem>> {
    return this.http.get<Array<IItem>>('http://localhost:3000/items');
  }

  findItemById(itemId: string): Observable<IItem> {
    return this.http.get<IItem>('http://localhost:3000/items/' + itemId);
  }

  searchItems(searchTerm): Observable<IItem[]> {
    return this.http.get<IItem[]>('http://localhost:3000/items/search?search=' + searchTerm)
      // .pipe(catchError(this.handleError<IItem[]>('searchItem')));
  }

  createItem(item: IItem): Observable<IItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IItem>('http://localhost:3000/items/create', item, { headers })
      .pipe(
        tap(data => console.log('createItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateItem(item: IItem): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>('http://localhost:3000/items/update', item,{ headers })
      .pipe(
        tap(() => console.log('updateItem: ' + item.id)),
        // Return the item on an update
        map(() => item),
        catchError(this.handleError)
      );
  }

  deleteItem(id: string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>('http://localhost:3000/items/' + id + '/delete', { headers })
      .pipe(
        tap(() => console.log('deleted item with id: ' + id)),
        // Return the item on an update
        catchError(this.handleError)
      );
  }

}
