import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../services/brands/brand.service';
import { BrandDTO } from '../DTO/brandDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { ProductDTO } from '../DTO/productDTO';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: BrandDTO[] = [];  // Store brands dynamically from the backend
  products: ProductDTO[] = [];
  selectedBrand: number | null = null; // Store selected brand ID (changed from string to number)

  currentPage = 1;
  itemsPerPage = 6;

  constructor(
    private router: Router,
    private dataLoaderService: DataLoaderService,
    private productService: ProductService,
  ) { }

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

  selectBrand(brandId: number): void {
    this.selectedBrand = brandId;
    this.getProductsByBrand(brandId);
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brandId === brandId);
    return brand ? brand.brandName : 'Unknown';
  }


  getProductsByBrand(brandId: number): void {
    this.dataLoaderService.getProductsByBrand(brandId).subscribe(
      (res: { data: ProductDTO[] }) => {
        this.products = res.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


}
