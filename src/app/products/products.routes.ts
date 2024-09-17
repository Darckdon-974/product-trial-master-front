import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ProductListComponent } from "./features/product-list/product-list.component";
import { ShoppingListComponent } from "./features/shopping-list/shopping-list.component";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
		component: ProductListComponent,
	},
	{
		path: "shopping",
		component: ShoppingListComponent,
	},
	{ path: "**", redirectTo: "list" },
];
