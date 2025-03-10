import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { ProductDTO } from '../DTO/productDTO';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: ProductDTO[] =[];

  constructor(
              private dataLoaderService:DataLoaderService,
  ){}

  ngOnInit(): void {
    this.getAllProducts();
  }



  getAllProducts():void{
    this.dataLoaderService.getAllProducts().subscribe(
      (res :{ data: ProductDTO[]}) =>{
        this.products = res.data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
