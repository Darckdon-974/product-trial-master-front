import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("products.json");
            }),
            tap((products) => this._products.set(products)),
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(productId: number, patchOperations: any[]): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${productId}`, patchOperations).pipe(
            catchError(() => of(false)),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === productId ? { ...p, ...this.applyPatch(patchOperations, p) } : p);
            }))
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }

    private applyPatch(patchOperations: any[], product: Product): Partial<Product> {
        const updatedProduct: Partial<Product> = { ...product };
    
        patchOperations.forEach(operation => {
            const path = operation.path.slice(1) as keyof Product;
            if (path in updatedProduct) {
                updatedProduct[path] = operation.value;
            }
        });
        return updatedProduct;
    }
}