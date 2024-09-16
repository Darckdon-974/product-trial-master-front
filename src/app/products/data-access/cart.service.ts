import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _items = new BehaviorSubject<Product[]>([]);
  public readonly items$ = this._items.asObservable();

  addToCart(item: Product) {
    const updatedItems = [...this._items.value, item];
    this._items.next(updatedItems);
  }

  getItems() {
    return this._items.value;
  }

  removeItem(index: number) {
    const updatedItems = this._items.value.filter((_, i) => i !== index);
    this._items.next(updatedItems);
  }
}
