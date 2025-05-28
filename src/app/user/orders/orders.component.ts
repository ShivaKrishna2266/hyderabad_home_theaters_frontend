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


paginatedOrders: any[] = [];
currentPage = 0;
pageSize = 1;

  constructor(
    private userStorageService: UserStorageService,
    private orderService: OrderService
  ) {}

  get totalPages(): number {
  return Math.ceil(this.userOrders.length / this.pageSize);
}

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

      this.updatePaginatedOrders();
  }


  updatePaginatedOrders() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  this.paginatedOrders = this.userOrders.slice(startIndex, startIndex + this.pageSize);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedOrders();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedOrders();
  }
}
}