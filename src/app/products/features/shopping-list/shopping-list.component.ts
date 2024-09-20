import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ShoppingListService } from 'app/products/data-access/shopping-list.service';
import { Product } from 'app/products/data-access/product.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, TagModule, CommonModule, InputNumberModule, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{

  private readonly shoppingListService= inject(ShoppingListService);
  public readonly shoppingList = this.shoppingListService.shoppingList;
  
  ngOnInit() {
    this.shoppingListService.getItems();
  }

  getSeverity (product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return  undefined;
    }
  };

  public onDelete(product: Product) {
    this.shoppingListService.removeItem(product.id);
  }
}
