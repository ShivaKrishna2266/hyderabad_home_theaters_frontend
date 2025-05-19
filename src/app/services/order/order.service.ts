import { HostListener, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserStorageService } from '../storege/user-storege.service';
import { CartService } from '../cart/cart.service';
import { ProfileDTO } from 'src/app/DTO/profileDTO';
const BASIC_URL = "http://localhost:7070"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  user: any = UserStorageService.getUser(); // { token, userId, username, email, role }
  profile: any = UserStorageService.getProfile(); // parsed profile object

  paymentId?: string;
  error?: string;

  options = {
    key: "rzp_test_4lw80NvYa0WUy3",
    amount: "10",
    name: "Yakambram Kommu",
    description: "Web Development",
    image: "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    order_id: "",
    handler: function (response: any) {
      const event = new CustomEvent("payment.success", {
        detail: response,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: "Shiva",
      email: "shiva@gmailcom",
      contact: "6300384953"
    },
    notes: {
      address: "Manikonda"
    },
    theme: {
      color: "#3399cc"
    }
  };

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) { }

  initiateOrder(totalAmount: any, profile: ProfileDTO): void {
    this.paymentId = '';
    this.error = '';

    this.createOrder(totalAmount, profile).subscribe(
      data => {
        this.cartService.clearCart();

        this.options.key = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee;

        this.options.prefill.name = this.profile.fullName;
        this.options.prefill.email = this.profile.email;
        this.options.prefill.contact = this.profile.mobileNumber;

        const rzp1 = new Razorpay(this.options);

        rzp1.on('payment.failed', (response: any) => {
          console.error("Payment Failed:", response);
          this.error = response.error.reason;

          const failedEvent = new CustomEvent('payment.failed', {
            detail: response,
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(failedEvent);
        });

        rzp1.on('payment.success', (response: any) => {
          console.log("Payment Success:", response);
          const event = new CustomEvent('payment.success', {
            detail: response,
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(event);
        });

        rzp1.open();

        UserStorageService.setOrderId(data.razorpayOrderId);
        this.router.navigateByUrl('user/orders');
      },
      err => {
        this.error = err.error?.message || "Order creation failed.";
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any }): void {
    console.log('Payment Success Handler:', event.detail);
    this.updateOrder(event.detail).subscribe(
      data => {
        this.paymentId = data.message;
      },
      err => {
        this.error = err.error?.message || "Failed to update order.";
      }
    );
  }

  @HostListener('window:payment.failed', ['$event'])
  onPaymentFailed(event: { detail: any }): void {
    console.log('Payment Failed Handler:', event.detail);
    // Handle failure logic
  }

  createOrder(totalAmount: any, profile: ProfileDTO): Observable<any> {
    const token = this.user?.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${BASIC_URL}/order`, {
      userId: this.user.userId,
      customerName: profile.firstName,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      amount: totalAmount, // ✅ Correct field name
      profile: {
        fullName: profile.fullName,
        firstName: profile.firstName,
        surname: profile.surname,
        username: this.user.username,
        email: profile.email,
        mobileNumber: profile.mobileNumber,
        addressLine1: profile.addressLine1,
        addressLine2: profile.addressLine2,
        landmark: profile.landmark,
        area: profile.area,
        city: profile.city,
        postCode: profile.postCode,
        region: profile.region,
        state: profile.state,
        country: profile.country

      }
    }, { headers });
  }

  updateOrder(order: { razorpay_order_id: any; razorpay_payment_id: any; razorpay_signature: any }): Observable<any> {
    const token = this.user?.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${BASIC_URL}/order`, {
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature
    }, { headers });
  }

  getOrders(): Observable<any> {
    const token = this.user?.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${BASIC_URL}/order`, { headers });
  }

  updateOrderStatus(order: { order_status: string }): Observable<any> {
    const token = this.user?.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${BASIC_URL}/order/${order.order_status}`, order, { headers });
  }
}