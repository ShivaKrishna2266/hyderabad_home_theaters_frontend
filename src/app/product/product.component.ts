import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { ProductDTO } from '../DTO/productDTO';
import { BrandDTO } from '../DTO/brandDTO';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: ProductDTO[] =[];
  brands: BrandDTO[] =[];

  constructor(
              private dataLoaderService:DataLoaderService,
  ){}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
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


  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(response => {
      console.log('API Response:', response);
  
      const brandList = Array.isArray(response) ? response : response?.data;
      if (Array.isArray(brandList)) {
        this.brands = brandList.reduce((acc: { [key: number]: string }, { brandId, brandName }: BrandDTO) => {
          acc[brandId] = brandName;
          return acc;
        }, {});
      } else {
        console.error('Unexpected response format:', response);
        // this.brands = {};
      }
    });
  }
}
