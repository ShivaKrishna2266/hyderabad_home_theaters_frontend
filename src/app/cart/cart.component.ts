import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  defaultImage = 'https://via.placeholder.com/150'; // optional fallback image

  constructor(private dataLoaderService: DataLoaderService) {}

  ngOnInit(): void {
    this.cartItems = this.dataLoaderService.getCartItems();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.productPrice, 0);
  }
}