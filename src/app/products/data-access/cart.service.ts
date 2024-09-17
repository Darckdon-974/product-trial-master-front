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
    const existingItem = this._items.value.find(i => i.code === item.code);
    if(existingItem){
      item.quantity = (item.quantity != null) ? item.quantity + 1 : 0;
      const updatedItems = [...this._items.value, item];
      console.log(updatedItems);
      this._items.next(updatedItems);
    }else {
      const updatedItems = [...this._items.value, item];
      console.log(updatedItems);
      this._items.next(updatedItems);

    }
  }

  getItems() {
    return this._items.value;
  }

  removeItem(index: number) {
    const updatedItems = this._items.value.filter((_, i) => i !== index);
    this._items.next(updatedItems);
  }
}
