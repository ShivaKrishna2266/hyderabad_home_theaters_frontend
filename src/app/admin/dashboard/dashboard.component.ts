import { Component, OnInit } from '@angular/core';
import { CustomersDTO } from 'src/app/DTO/customersDTO';
import { OrderDTO } from 'src/app/DTO/orderDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { ProductService } from 'src/app/services/admin/product.service';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';
import { OrderService } from 'src/app/services/order/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: ProductDTO[] = [];
  orders: OrderDTO[] = [];
  customers: CustomersDTO[] = [];

  totalSalesAmount: number = 0;  
  totalOrders: number = 0; 
  totalcustomers: number = 0 ;     


  currentPage: number = 1;
pageSize: number = 8;  // items per page

  constructor(
    private productService: ProductService,
    private orderServices: OrderService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllOrders();
    this.getAllCustomers();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data;
      },
      (error) => {
        console.error("Error fetching Products", error);
      }
    );
  }

  getAllOrders(): void {
    this.orderServices.getOrders().subscribe(
      (res: any) => {
        this.orders = res.data;
        this.totalOrders = this.orders.length; // just count orders
        this.calculateTotalSalesFromOrders();
      },
      (error) => {
        console.error("Error fetching Orders", error);
      }
    );
  }

  getAllCustomers(){
    this.productService.getAllCustomers().subscribe(
      (res : any)=>{
        this.customers = res.data;
        this.totalcustomers = this.customers.length; 
      },
      (error) => {
        console.error("Error fetching Customers", error);
      }
    )
  }

  calculateTotalSalesFromOrders(): void {
    const allowedStatuses = ['recieved', 'placed', 'picked'];
    this.totalSalesAmount = this.orders
      .filter(order =>
        order.orderStatus &&
        allowedStatuses.includes(order.orderStatus.trim().toLowerCase())
      )
      .reduce((sum: number, order: OrderDTO) => {
        const orderTotal = typeof order.amount === 'string'
          ? parseFloat(order.amount)
          : order.amount;
        return sum + (orderTotal || 0);
      }, 0);
  }


  get paginatedOrders(): OrderDTO[] {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.orders.slice(start, end);
}

get totalPages(): number {
  return Math.ceil(this.orders.length / this.pageSize);
}

changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

}