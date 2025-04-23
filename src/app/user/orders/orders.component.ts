import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/storege/user-storege.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orderId : any = UserStorageService.getOrderId();

  constructor(){}

  ngOnInit(): void {
    
  }
}
