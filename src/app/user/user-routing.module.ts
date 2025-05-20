import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { OrdersComponent } from "./orders/orders.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { UserAuthGuard } from "../services/auth/user.auth.guard";
import { PaymentComponent } from "./payment/payment.component";




const routes: Routes = [
  { path: '', component: UserComponent, children: [
      // { path: '', redirectTo: 'account-details', pathMatch: 'full' },
      { path: 'user', component:UserComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'account-details', component: AccountDetailsComponent },
      { path: 'payment', component: PaymentComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }