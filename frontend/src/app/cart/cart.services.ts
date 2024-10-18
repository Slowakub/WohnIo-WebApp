import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart'; // Backend URL

  constructor(private http: HttpClient) {}

  // Get user's cart
  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  // Add product to cart
  addToCart(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${productId}`, {});
  }

  // Remove product from cart
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${productId}`);
  }

  // Checkout the cart
  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}
