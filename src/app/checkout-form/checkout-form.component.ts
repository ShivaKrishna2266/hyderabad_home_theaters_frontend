import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { PaymentService } from '../services/payment/payment.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { UserStorageService } from '../services/storege/user-storege.service';
import { UserDTO } from '../DTO/userDTO';
import { ProfileDTO } from '../DTO/profileDTO';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  selectedPaymentMethod: string = 'razorpay'; // Default to Razorpay
  email: string | null = null;
  userGender: string | null = null;
  upiId: string = ''; // For Razorpay UPI
  bankReferenceId: string = ''; // For Bank deposits
  totalAmount: number = 0.0;
  razorpayOptions: any = {};
  cartItems: any[] = [];
  userName: string | null = null;
  profile: ProfileDTO | null = null;

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private paymentServicee: PaymentService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    console.log('Navigation state:', state); // <-- Add this log

    if (state && state['cartItems'] && state['totalAmount']) {
      this.cartItems = state['cartItems'];
      this.totalAmount = state['totalAmount'];
    } else {
      // fallback if page is refreshed or direct access
      console.warn('No navigation state, loading from CartService');
      this.cartItems = this.cartService.getCartItems();
      this.totalAmount = this.cartService.getTotalAmount();
    }
  }

  ngOnInit(): void {

    const user = UserStorageService.getUser() as UserDTO;

    if (user) {
      this.email = user.email;
      this.userName = user.username;
      if (user.profile) {
        this.profile = JSON.parse(user.profile);
      }
    }

    this.paymentServicee.totalAmount$.subscribe((totalAmount: number) => {
      console.log('Received totalAmount from service:', totalAmount);
      this.totalAmount = totalAmount;
    });

    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
    });
  }

  initiatePayment(): void {
    const user = UserStorageService.getUser();
    const profile = UserStorageService.getProfile();

    if (!user || !user.username) {
      alert('Please log in before placing an order.');
      this.router.navigate(['/login']);
      return;
    }

    if (!profile) {
      alert('User profile not found. Please complete your profile first.');
      return;
    }
    this.orderService.initiateOrder(this.totalAmount);

  }
  login(): void {
    this.router.navigate(['/login']);
  }
}