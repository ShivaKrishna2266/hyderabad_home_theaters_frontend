import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {


  product: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }
  ngOnInit(): void {
    
  }
}
