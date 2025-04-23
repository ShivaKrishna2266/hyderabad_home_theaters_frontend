import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { PaymentService } from '../services/payment/payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {

  totalAmount: number = 0.0; 
  razorpayOptions: any = {}; 
  cartItems: any[] = [];
  

  constructor(
    public cartService: CartService, 
    private orderService: OrderService, 
    private paymentServicee:PaymentService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.paymentServicee.totalAmount$.subscribe((totalAmount: number) => {
      console.log('Received totalAmount from service:', totalAmount);
      this.totalAmount = totalAmount;
    });

    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    const navState = history.state;
    this.cartItems = navState.cartItems || [];
    this.totalAmount = navState.totalAmount || 0;

      // ... existing code ...
  window.addEventListener('payment.success', (e: any) => {
    console.log('Payment was successful:', e.detail);
  });

  window.addEventListener('payment.failed', (e: any) => {
    console.log('Payment failed:', e.detail);
  });
  }
  initiatePayment(): void {
    this.orderService.initiateOrder(this.totalAmount);
    alert("Order Placed Successfully")
  }
}