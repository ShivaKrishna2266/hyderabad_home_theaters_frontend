import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/DTO/orderDTO';
import { UserStorageService } from 'src/app/services/storege/user-storege.service';
import { OrderService } from 'src/app/services/user/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  userOrders: OrderDTO[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private userStorageService: UserStorageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const user = UserStorageService.getUser();
    const userId = user?.userId;

    if (userId) {
      this.orderService.getOrdersByUserId(userId).subscribe({
        next: (orders) => {
          this.userOrders = orders;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load order details.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'User not found. Please log in.';
      this.loading = false;
    }
  }
}
