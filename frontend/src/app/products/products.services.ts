import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/products'; // Backend URL

  constructor(private http: HttpClient) {}

  // Get product by ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  // Create a new product (Admin only)
  createProduct(storeId: string, productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, {
      ...productData
    });
  }
}
