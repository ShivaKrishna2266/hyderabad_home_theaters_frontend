import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { PaymentService } from '../services/payment/payment.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { UserStorageService } from '../services/storege/user-storege.service';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
selectedPaymentMethod: string = 'razorpay'; // Default to Razorpay
  userEmail: string | null = null;
  userGender: string | null = null;
  upiId: string = ''; // For Razorpay UPI
  bankReferenceId: string = ''; // For Bank deposits
  totalAmount: number = 0.0;
  razorpayOptions: any = {};
  cartItems: any[] = [];
  userName: string | null = null;

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private paymentServicee: PaymentService,
    private userStorageService: UserStorageService,
    private router: Router
  ) {
    // Get the state passed from the previous navigation, e.g., cartItems, totalAmount
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      this.cartItems = state['cartItems'];
      this.totalAmount = state['totalAmount'];
    }
  }

  ngOnInit(): void {
    // Subscribe to paymentService to get the total amount, if it is updated externally
    this.paymentServicee.totalAmount$.subscribe((totalAmount: number) => {
      console.log('Received totalAmount from service:', totalAmount);
      this.totalAmount = totalAmount;
    });

    // Subscribe to cartService to get cart items
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
    });

    // Retrieve the logged-in user from userStorageService
    const user =UserStorageService.getUser();
    if (user) {
      this.userEmail = user.email;
       this.userName = user.name; 
      this.userGender = user.gender; // Capture gender of the user
    } else {
      this.userEmail = null;
      this.userName = null;
      this.userGender = null;
    }
  }

  // Method to handle payment initiation
  initiatePayment(): void {
    if (!this.userEmail) {
      alert('Please log in before placing an order.');
      this.router.navigate(['/login']);
      return;
    }

    // Get user data from local storage or session (assuming it returns user object)
    const user =UserStorageService.getUser();
    if (!user) {
      alert('User data is missing.');
      return;
    }

    const userId = user.userId; // Assuming user object has 'id'
    const gender = user.gender; // Assuming user object has 'gender'

    // Prepare order data
    const orderData = {
      userId: userId,
      gender: gender,
      totalAmount: this.totalAmount,
      cartItems: this.cartItems,
    };

    // Call orderService to place the order
    this.orderService.initiateOrder(orderData);

    // Alert the user after order placement
    alert("Order Placed Successfully");

    // Optionally, you can redirect to a success page or clear the cart
    // this.router.navigate(['/order-success']);
  }

  // Method to navigate to the login page
  login(): void {
    this.router.navigate(['/login']); // Adjust path as per your route setup
  }
}