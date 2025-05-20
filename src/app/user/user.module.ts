import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  declarations: [
    UserComponent,
    OrdersComponent,
    AccountDetailsComponent,
    PaymentComponent,
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule { }
