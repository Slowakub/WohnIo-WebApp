import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from '../../stores/stores.services';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  storeId!: string;
  newProductName: string = '';
  newProductDescription: string = '';
  newProductPrice: number = 0;

  constructor(private storesService: StoresService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.paramMap.get('storeId') || '';
    this.fetchProducts();
  }

  fetchProducts() {
    this.storesService.getStoreProducts(this.storeId).subscribe(
      (products) => {
        this.products = products;
      },
      (err) => {
        console.error('Error fetching products', err);
      }
    );
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  addProduct() {
    if (this.newProductName && this.newProductPrice > 0) {
      const newProduct: Product = {
        id: '',
        name: this.newProductName,
        description: this.newProductDescription,
        price: this.newProductPrice,
        storeId: this.storeId,
      };

      this.storesService.addProductToStore(this.storeId, newProduct).subscribe(
        (product) => {
          console.log('Product added successfully:', product);
          this.fetchProducts();
        },
        (err) => {
          console.error('Error adding product:', err);
        }
      );
    }
  }
}
