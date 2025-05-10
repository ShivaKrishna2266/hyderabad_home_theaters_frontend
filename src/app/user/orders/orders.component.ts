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
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userStorageService: UserStorageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const user = UserStorageService.getUser();
    const userId = user?.userId;

    if (!userId) {
      this.errorMessage = 'User not found.';
      this.loading = false;
      return;
    }

    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (res: any) => {
        this.userOrders = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching user orders:', err);
        this.errorMessage = 'Failed to fetch user orders.';
        this.loading = false;
      }
    });
  }
}