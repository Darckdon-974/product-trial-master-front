import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { ShoppingListService } from "app/products/data-access/shopping-list.service";
import { Product, ShoppingList } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { SelectItem } from "primeng/api";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule, 
    CardModule, 
    ButtonModule, 
    DialogModule, 
    ProductFormComponent, 
    TagModule, 
    CommonModule, 
    DropdownModule, 
    FormsModule,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly shoppingListService = inject(ShoppingListService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  ngOnInit() {
    this.productsService.get().subscribe();
    this.sortOptions = [
      { label: 'Prix ordre croissant', value: 'price' },
      { label: 'Prix ordre decroissant', value: '!price' }
    ];
  }
  
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
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

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product.id, [
        { "op": "replace", "path": "/name", "value": product.name },
        { "op": "replace", "path": "/price", "value": product.price },
        { "op": "replace", "path": "/description", "value": product.description },
        { "op": "replace", "path": "/category", "value": product.category }
      ]).subscribe(success => {
        if (success) {
          console.log("Product updated successfully");
        }
      });
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  public addProductToShoppingList(product: ShoppingList){
    this.shoppingListService.addToShoppingList(product);
  }
}
