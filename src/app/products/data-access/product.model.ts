export interface Product {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
    rating: number;
    createdAt: number;
    updatedAt: number;
}

export interface ShoppingList extends Product {
    quantityItem: number;
}

export class ShoppingListClass implements ShoppingList {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
    rating: number;
    createdAt: number;
    updatedAt: number;
    quantityItem: number = 0; // Valeur par défaut définie ici

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        image: string,
        category: string,
        price: number,
        quantity: number,
        internalReference: string,
        shellId: number,
        inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK",
        rating: number,
        quantityItem: number = 0) {
            this.id = id;
            this.code = code;
            this.name = name;
            this.description = description;
            this.image = image;
            this.category = category;
            this.price = price;
            this.quantity = quantity;
            this.internalReference = internalReference;
            this.shellId = shellId;
            this.inventoryStatus = inventoryStatus;
            this.rating = rating;
            this.createdAt = Date.now();
            this.updatedAt = Date.now();
            this.quantityItem = quantityItem;
    }
}