import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { PaymentService } from '../services/payment/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  quantity: number = 1;
  totalAmount: number = 0;
  defaultImage = 'https://via.placeholder.com/150';

  constructor(
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private cartService: CartService,
    private paymentService: PaymentService // <-- Inject PaymentService
  ) {}

  ngOnInit(): void {

    this.cartItems = this.cartService.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1,
      productName: item.product.productName,
      categoryName: item.product.categoryName,
      productPrice: item.product.productPrice
    }));
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.productPrice * item.quantity);
    }, 0);
  }

  deleteItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartService.setCartItems(this.cartItems);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.cartService.updateQuantity(this.cartItems[index].product, this.cartItems[index].quantity);
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartService.updateQuantity(this.cartItems[index].product, this.cartItems[index].quantity);
    }
  }

  checkOut() {
    const subtotal = this.getSubtotal();
    const shipping = 10;
    const tax = 20;
    const totalAmount = subtotal + shipping + tax;

    this.cartService.setCartItems(this.cartItems);
    this.cartService.setTotalAmount(totalAmount);

    // ✅ Inform paymentService about total
    this.paymentService.totalOrderAmount(this.totalAmount);

    this.router.navigate(['/checkout-form'], {
      state: { cartItems: this.cartItems, totalAmount: totalAmount }
    });
  }
}