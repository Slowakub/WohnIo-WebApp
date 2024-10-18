import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.services';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(
      (items) => {
        this.cartItems = items;
      },
      (err) => {
        console.error('Error fetching cart items', err);
      }
    );
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      () => {
        console.log(`Product with id ${productId} removed from cart successfully`);
        this.loadCartItems(); // Reload cart items after removal
      },
      (err) => {
        console.error('Error removing product from cart', err);
      }
    );
  }

  checkout(): void {
    this.cartService.checkout().subscribe(
      () => {
        console.log('Checkout successful');
        this.cartItems = []; // Clear cart items after checkout
      },
      (err) => {
        console.error('Error during checkout', err);
      }
    );
  }
}
