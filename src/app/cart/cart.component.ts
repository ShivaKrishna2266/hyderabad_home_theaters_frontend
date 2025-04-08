import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  quantity: number = 1;
  defaultImage = 'https://via.placeholder.com/150'; // optional fallback image

  constructor(private dataLoaderService: DataLoaderService,
              private router : Router,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.dataLoaderService.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);
  }

  deleteItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
}

  checkOut(){
    this.router.navigate(['/checkout-form']);
  }
}