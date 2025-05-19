import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  public orders: any[] = [];
  public isShowForm = false;
  public orderForm!: FormGroup;
  public pageSize = 10;
  public currentPage = 1;
  public totalItems = 0;
  public selectedOrder: any = {};
  public orderStatuses: string[] = [
    'Placed', 'Pending', 'Out for delivery', 'Recieved', 'Cancelled', 'Returned', 'Picked'
  ];

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {}

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

  getAllOrders() {
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res;
        this.totalItems = res.length;
      },
      (err) => {
        console.error('Error fetching orders', err);
      }
    );
  }

  editOrder(order: any) {
    this.selectedOrder = { ...order };
    this.orderForm.patchValue(this.selectedOrder);
    this.isShowForm = true;
  }

  save() {
    if (this.orderForm.invalid) return;

    if (this.orderForm.value.id) {
      this.orderService.updateOrderStatus(this.orderForm.value).subscribe(
        () => this.getAllOrders(),
        (err) => console.error('Update error:', err)
      );
    } else {
      // this.orderService.createOrder(this.orderForm.value,).subscribe(
      //   () => this.getAllOrders(),
      //   (err) => console.error('Create error:', err)
      // );
    }

    this.isShowForm = false;
    this.clear();
  }

  clear() {
    this.orderForm.reset();
    this.selectedOrder = {};
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