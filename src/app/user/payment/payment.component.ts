import { Component, OnInit } from '@angular/core';
import { ProfileDTO } from 'src/app/DTO/profileDTO';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  totalAmount: number = 0.0; 
  razorpayOptions: any = {}; 
 profile!: ProfileDTO;

  constructor(private orderService:OrderService, 
              private paymentServicee:PaymentService) { }

  ngOnInit(): void {
    this.paymentServicee.totalAmount$.subscribe((totalAmount: number) => {
      this.totalAmount = totalAmount;
    });
  }
  initiatePayment(): void {
    this.orderService.initiateOrder(this.totalAmount, this.profile);
    
  }
}
