import {
  Component,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { Product } from "./products/data-access/product.model";
import { Observable } from "rxjs";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule, 
    SplitterModule, 
    ToolbarModule, 
    PanelMenuComponent, 
    CommonModule, 
    ButtonModule, 
    CardModule
  ],
})
export class AppComponent {
  private readonly cartService = inject(CartService);
  public numberCartItem: number = 0;
  public readonly cartItem$: Observable<Product[]> = this.cartService.items$;
  title = "ALTEN SHOP";

  
  constructor() {
    this.cartItem$.subscribe(items => {
      this.numberCartItem = items.length;
    });
  }

  getBadgeCount(){
    return this.numberCartItem;
  }

  onDelete(product: Product){
    this.cartService.removeItem(product.id);
  }
}
