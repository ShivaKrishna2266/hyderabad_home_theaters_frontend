import { HostListener, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserStorageService } from '../storege/user-storege.service';
import { CartService } from '../cart/cart.service';

const BASIC_URL = "http://localhost:7070";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

declare var Razorpay: any;

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    profile: any = UserStorageService.getProfile();
    userId: any = UserStorageService.getUserId();
    email: any = UserStorageService.getEmail();
    role: any = UserStorageService.getUserRole();
    paymentId: string | undefined;
    error: string | undefined;
    options = {
        key: "rzp_test_4lw80NvYa0WUy3",
        amount: "10", 
        name: "Yakambram Kommu",
        description: "Web Development",
        image: "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
        order_id: "",
        handler: function (response: any) {
            var event = new CustomEvent("payment.success", 
                {
                    detail: response,
                    bubbles: true,
                    cancelable: true
                }
            );	  
            window.dispatchEvent(event);
        },
        prefill: {
            name: "Yakambram",
            email: "yakambram.kommu@gmail.com",
            contact: "9676222172"
        },
        notes: {
            address: "Manikonda"
        },
        theme: {
            color: "#3399cc"
        }
    };

    constructor(private http: HttpClient, private cartService: CartService, private router: Router) {}

    initiateOrder(totalAmount: any): void {
        this.paymentId = ''; 
        this.error = ''; 

        // Check if profile is available and complete
        if (!this.profile || !this.profile.fullName || !this.profile.email || !this.profile.mobileNumber) {
            this.error = 'Profile information is incomplete or missing. Please log in again.';
            return; // Exit the method if profile data is invalid
        }

        // Proceed to create the order
        this.createOrder(totalAmount).subscribe(
            data => {
                this.cartService.clearCart();
                this.options.key = data.secretKey;
                this.options.order_id = data.razorpayOrderId;
                this.options.amount = data.applicationFee; // paise
                this.options.prefill.name = this.profile.fullName;
                this.options.prefill.email = this.profile.email;
                this.options.prefill.contact = this.profile.mobileNumber;
                
                var rzp1 = new Razorpay(this.options);
                rzp1.on('payment.failed', (response: { error: { code: any; description: any; source: any; step: any; reason: string; metadata: { order_id: any; payment_id: any; }; }; }) => {
                    // Handle payment failure
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    this.error = response.error.reason;

                    var failedEvent = new CustomEvent('payment.failed', {
                        detail: response,
                        bubbles: true,
                        cancelable: true,
                    });
                    window.dispatchEvent(failedEvent);
                });

                rzp1.on('payment.success', (response: any) => {
                    console.log(response);
                    var event = new CustomEvent('payment.success', {
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
                this.error = err.error.message;
            }
        );
    }

    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event: { detail: any; }): void {
        console.log('Inside onPaymentSuccess:', event.detail);
        this.updateOrder(event.detail).subscribe(
            data => {
                this.paymentId = data.message;
            },
            err => {
                this.error = err.error.message;
            }
        );
    }

    @HostListener('window:payment.failed', ['$event']) 
    onPaymentFailed(event: { detail: any; }): void {
        console.log('Inside onPaymentFailed:', event.detail);
        // Handle the payment failure as needed
    }

    createOrder(totalAmount: any): Observable<any> {
        return this.http.post(BASIC_URL + '/order', {
            userId: this.userId,
            customerName: this.profile.fullName,
            email: this.profile.email,
            mobileNumber: this.profile.mobileNumber,
            amount: totalAmount,
            profile: this.profile
        }, httpOptions);
    }

    updateOrder(order: { razorpay_order_id: any; razorpay_payment_id: any; razorpay_signature: any; }): Observable<any> {
        return this.http.put(BASIC_URL + '/order', {
            razorpayOrderId: order.razorpay_order_id,
            razorpayPaymentId: order.razorpay_payment_id,
            razorpaySignature: order.razorpay_signature
        }, httpOptions);
    }

    getOrders(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(BASIC_URL + '/order', { headers: headers });
    }

    updateOrderStatus(order: { order_status: string; }): Observable<any> {
        return this.http.put(BASIC_URL + '/order' + order.order_status, order, httpOptions);
    }
}
