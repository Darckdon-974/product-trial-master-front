import {
  Component,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { ShoppingListService } from "./products/data-access/shopping-list.service";
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
  private readonly shoppingListService = inject(ShoppingListService);
  public readonly title: string = "ALTEN SHOP";

  getBadgeCount(): number {
    return this.shoppingListService.numberOfProduct;
  }
}
