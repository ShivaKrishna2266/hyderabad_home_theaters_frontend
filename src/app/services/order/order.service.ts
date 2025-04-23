import { HostListener, Injectable } from '@angular/core';
import { DataLoaderService } from '../data_loader/data-loader.service';
import { UserStorageService } from '../storege/user-storege.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
const apiUrl ="http://localhost:7070"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private paymentId: string | undefined;
  private error: string | undefined;

  // Get profile and user info from localStorage
  // profile : any = JSON.parse(UserStorageService.getProfile());
  profile: any = UserStorageService.getProfile();
  userId: any = UserStorageService.getUserId();
  email: any = UserStorageService.getEmail();
  role: any = UserStorageService.getUserRole();

  // Razorpay configuration
  options = {
    key: 'rzp_test_4lw80NvYa0WUy3', // Your Razorpay Test Key
    amount: '10', // Default amount (to be updated dynamically)
    name: 'Yakambram Kommu', // Placeholder name
    description: 'Web Development', // Placeholder description
    image: 'https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png',
    order_id: '', // Razorpay order ID
    handler: (response: any) => {
      const successEvent = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(successEvent);
    },
    prefill: {
      name: 'Yakambram',
      email: 'yakambram.kommu@gmail.com',
      contact: '9676222172',
    },
    notes: {
      address: 'Manikonda',
    },
    theme: {
      color: '#3399cc',
    }
  };

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {}

  // Initiates the order and handles Razorpay payment flow
  initiateOrder(totalAmount: number): void {
    this.paymentId = '';
    this.error = '';

    this.createOrder(totalAmount).subscribe(
      (data) => {
        // Clear cart before initiating payment
        this.cartService.clearCart();

        // Update Razorpay options with order data
        this.options.key = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee;
        this.options.prefill.name = this.profile?.fullName || 'Guest';
        // this.options.prefill.name = this.profile.fullName;
        this.options.prefill.email = this.profile.email;
        this.options.prefill.contact = this.profile.mobileNumber;

        // Open Razorpay Checkout
        const rzp = new Razorpay(this.options);

        rzp.on('payment.failed', (response: any) => {
          console.error('Payment Failed:', response.error);
          this.error = response.error.reason;

          const failedEvent = new CustomEvent('payment.failed', {
            detail: response,
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(failedEvent);
        });

        rzp.on('payment.success', (response: any) => {
          console.log('Payment Success:', response);
          const successEvent = new CustomEvent('payment.success', {
            detail: response,
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(successEvent);
        });

        rzp.open();

        // Save Razorpay order ID for future reference
        UserStorageService.setOrderId(data.razorpayOrderId);

        // Navigate to the order list after payment (optional)
        this.router.navigateByUrl('/user/orders');
      },
      (err) => {
        this.error = err?.error?.message || 'Order creation failed';
        console.error('Order Error:', this.error);
      }
    );
  }

  // Handle payment failure
  @HostListener('window:payment.failed', ['$event'])
  onPaymentFailed(event: any): void {
    console.log('Inside onPaymentFailed:', event.detail);
    // Handle failure (e.g. show toast notification)
  }

  // Creates an order on the backend
  createOrder(totalAmount: number): Observable<any> {
    const payload = {
      userId: this.userId,
      userName: this.profile?.fullName || "Default Name", // If profile is null, use fallback value
      userNmae: this.profile?.username || "defaultUsername",
      email: this.profile?.email || "default@example.com",
      mobileNumber: this.profile?.mobileNumber || "0000000000",
      amount: totalAmount,
      profile: this.profile // This can be null or an empty object if not needed
    };
  
    return this.http.post<any>(`${apiUrl}/order`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Updates an order after payment completion
  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/order`, {
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Fetches all orders
  getOrders(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/order`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Updates the status of an order
  updateOrderStatus(order: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/order/${order.order_status}`, order, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}