import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private totalAmountSubject = new BehaviorSubject<number>(0.0);
  totalAmount$ = this.totalAmountSubject.asObservable();
  constructor() { }


  totalOrderAmount(totalAmount:number) {
      this.totalAmountSubject.next(totalAmount);
  }

}

