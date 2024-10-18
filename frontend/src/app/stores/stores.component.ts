import { Component, OnInit } from '@angular/core';
import { StoresService } from '../stores/stores.services';
import { Store } from '../models/store.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores: Store[] = [];
  newStoreName: string = '';
  newStoreType: string = '';

  constructor(private storesService: StoresService) {}

  ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    this.storesService.getStores().subscribe(
      (stores) => {
        this.stores = stores;
      },
      (err) => {
        console.error('Error fetching stores', err);
      }
    );
  }

  getUserRole(): string | null {
    return localStorage.getItem('role'); // Get the user's role from local storage
  }

  createStore() {
    if (this.newStoreName) {
      const newStore: Store = {
        id: '',
        name: this.newStoreName,
        type: this.newStoreType,
      };

      this.storesService.createStore(newStore).subscribe(
        (store) => {
          console.log('Store created successfully:', store);
          this.fetchStores(); // Refresh stores after creation
        },
        (err) => {
          console.error('Error creating store:', err);
        }
      );
    }
  }
}
