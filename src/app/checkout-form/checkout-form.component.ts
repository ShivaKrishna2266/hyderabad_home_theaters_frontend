import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data_loader/data-loader.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {

  checkoutForm!: FormGroup;
  promoCode: string = '';
  appliedPromo: string = '';
  discountAmount: number = 0;
  subtotal: number = 0;

  cartItems: any[] = [];
  total: number = 0;

  currentStep: number = 1;



  paymentModes: string[] = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'];
  selectedPaymentMode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        receiveUpdates: [false]
      }),
      shipping: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        address: ['', Validators.required],
        address2: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        sameAddress: [false],
        saveInfo: [false]
      }),
      payment: this.formBuilder.group({
        paymentMethod: ['credit', Validators.required],
        selectedPaymentMode: [''] // optional: if you want to capture specific mode
      }),
      review: this.formBuilder.group({
        promoCode: ['']
      })
    });
  
    const cart = this.dataLoaderService.getCart();
    this.cartItems = cart.items;
    this.total = cart.total;
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  applyPromo() {
    const promoCode = this.checkoutForm.get('review.promoCode')?.value.trim().toUpperCase();
    if (promoCode === 'PREMIUM20') {
      this.discountAmount = 10;
      this.appliedPromo = promoCode;
    } else {
      this.discountAmount = 0;
      this.appliedPromo = 'Invalid';
    }
  }

  

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted:', this.checkoutForm.value);
      this.dataLoaderService.submitOrder(this.checkoutForm.value).subscribe({
        next: (response: any) => {
          console.log('Order successful', response);
        },
        error: (error: any) => {
          console.error('Error placing order', error);
        }
      });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}