import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private baseUrl = 'http://localhost:3000/stores'; // Backend URL

  constructor(private http: HttpClient) {} // HttpClient should be injected in constructor

  // Get all stores
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}`);
  }

  // Create a store (Admin only)
  createStore(storeData: Store): Observable<Store> {
    return this.http.post<Store>(`${this.baseUrl}`, storeData);
  }

  // Get products by store ID
  getStoreProducts(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${storeId}/products`);
  }
  addProductToStore(storeId: string, productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/${storeId}/products`, productData);
  }
  
}
