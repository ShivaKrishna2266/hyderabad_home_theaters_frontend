import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../services/brands/brand.service';
import { BrandDTO } from '../DTO/brandDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: BrandDTO[] = [];  // Store brands dynamically from the backend
  selectedBrand: string = '';
  products: string[] = [];

  constructor(
    private router: Router,
    private dataLoaderService:DataLoaderService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: { data: BrandDTO[] }) => {
        this.brands = res.data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  selectBrand(brand: string) {
    this.selectedBrand = brand;
    // this.getProductsByBrand(brand);
  }

  // getProductsByBrand(brand: string): void {
  //   this.brandService.getProductsByBrand(brand).subscribe(
  //     (res: { data: string[] }) => {
  //       this.products = res.data;
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);
  //     }
  //   );
  // }
}
