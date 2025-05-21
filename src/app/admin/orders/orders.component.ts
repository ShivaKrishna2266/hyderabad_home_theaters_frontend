import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { OrderDTO } from 'src/app/DTO/orderDTO';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public filteredOrders: OrderDTO[] = [];
  orders: OrderDTO[] = [];
  public isShowForm = false;
  public orderForm!: FormGroup;

  usernameFilter: string = '';
  statusFilter: string = '';

  public pageSize = 10;
  public currentPage = 1;
  public totalItems = 0;
  public selectedOrder: any = {};

  public orderStatuses: string[] = [
    'Placed', 'Pending', 'Out for delivery', 'Recieved',
    'Cancelled', 'Returned', 'Picked', 'COMPLETED'
  ];

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAllOrders();
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      id: [null],
      userId: [null, Validators.required],
      razorpayPaymentId: [null, Validators.required],
      razorpayOrderId: [null, Validators.required],
      razorpaySignature: [null, Validators.required],
      customerName: [null, Validators.required],
      email: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      amount: [null, Validators.required],
      profile: [null, Validators.required],
      orderStatus: [null, Validators.required]
    });
  }


  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesUserName = this.usernameFilter
        ? order.username?.toLowerCase().includes(this.usernameFilter.toLowerCase())
        : true;

      const matchesStatus = this.statusFilter
        ? order.orderStatus?.toLowerCase() === this.statusFilter.toLowerCase()
        : true;

      return matchesUserName && matchesStatus;
    });

    this.totalItems = this.filteredOrders.length;
    this.currentPage = 1; // Optional: reset to first page
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res.data;             // ✅ Assign to the source list
        this.applyFilters();                // ✅ Apply filters to update filteredOrders
      },
      (err) => {
        console.error('Error fetching orders:', err);
      }
    );
  }


  updateOrderStatus(order: OrderDTO) {
    if (!order.razorpayOrderId || !order.orderStatus) return;

    this.orderService.updateOrderStatus({
      razorpayOrderId: order.razorpayOrderId,
      orderStatus: order.orderStatus
    }).subscribe(
      () => {
        console.log('Order updated successfully');
        this.getAllOrders();
      },
      (err) => {
        console.error('Update error:', err);
      }
    );
  }

  clear() {
    this.orderForm.reset();
    this.selectedOrder = {};
  }

  calculateTotalItems() {
    this.totalItems = this.filteredOrders.length;
  }

  getPageArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }
}
