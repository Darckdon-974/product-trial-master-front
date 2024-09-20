import { Injectable, signal } from '@angular/core';
import { Product, ShoppingList } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public numberOfProduct:number = 0;

  private readonly _shoppingList = signal<ShoppingList[]>([]);
  public readonly shoppingList = this._shoppingList.asReadonly();



  addToShoppingList(item: ShoppingList) {
    if (!item || !item.id) {
      console.warn('Invalid product. Cannot add to product.');
      return;
    }

    this._shoppingList.update(products => {
      const existingProduct = products.find(product => product.id === item.id);
  
      if (existingProduct) {
        // Si le produit existe, on augmente la quantité
        return products.map(product =>
          product.id === item.id
            ? { ...product, quantityItem: product.quantityItem + 1 }
            : product
        );
      } else {
        return [{ ...item, quantityItem: 1 }, ...products];
      }
    });
    this.updateProductCount();
  }

  getItems() {
    return this._shoppingList.asReadonly();
  }

  removeItem(index: number): void {
    const productExists = this._shoppingList().some(product => product.id === index);
    if (!productExists) {
      console.warn(`Product with ID ${index} not found in cart.`);
      return;
    }

    this._shoppingList.update(products => products.filter(product => product.id !== index));
    this.updateProductCount();
  }

  private updateProductCount(): void {
    this.numberOfProduct = this._shoppingList().length;
  }
}
