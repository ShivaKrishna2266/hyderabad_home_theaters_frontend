import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../services/brands/brand.service';
import { BrandDTO } from '../DTO/brandDTO';
import { ProductDTO } from '../DTO/productDTO';
import { ProductService } from '../services/product/product.service';
import { DataLoaderService } from '../services/data_loader/data-loader.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: BrandDTO[] = [];
  products: ProductDTO[] = [];
  brandId: number | null = null;
  brandName: string = '';
  displayedBrands: BrandDTO[] = [];

  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 0;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.route.paramMap.subscribe(params => {
      const id = params.get('brandId');
      if (id) {
        this.brandId = Number(id);
        this.getProductsByBrand(this.brandId);
        this.getBrandName(this.brandId);
      } else {
        this.brandId = null;
        this.products = [];
        this.brandName = '';
      }
    });

  }

  getBrandName(brandId: number): void {
    if (!brandId) {
      this.brandName = '';
      return;
    }
  
    this.dataLoaderService.getBrandById(brandId).subscribe({
      next: (brand) => {
        console.log("Fetched brand:", brand);
        if (brand && brand.brandName) {
          this.brandName = brand.brandName;
        } else {
          this.brandName = '';
        }
      },
      error: (error) => {
        console.error('Error fetching brand name:', error);
        this.brandName = '';
      }
    });
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res?.data || [];
         // 👇 FIX: Recalculate totalPages after brands are loaded
        this.totalPages = Math.ceil(this.brands.length / this.itemsPerPage);
        this.updateDisplayedBrands();
      },
      (error) => {
        console.error('Error fetching brands:', error);
        this.brands = [];
      }
    );
  }

  getProductsByBrand(brandId: number): void {
    this.dataLoaderService.getProductsByBrand(brandId).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.products = res.data;
        } else {
          console.warn('No products found for category ID:', brandId);
          this.products = []; // Ensure the array is reset if no data is received
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.products = []; // Reset on error to avoid stale data
      }
    );
  }

  showBrands(): void {
    this.brandId = null;
    this.brandName = '';
    this.products = [];
    this.router.navigate(['/brands']);
  }

  updateDisplayedBrands(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBrands = this.brands.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.brands.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedBrands();
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBrands();
    }
  }


  // addToCart(product: any) {
  //   // this.cartService.addToCart(product);
  //   this.router.navigate(['/cart']);
  // }



  addToCart(product: any) {
    this.dataLoaderService.addToCart(product);
    this.router.navigate(['/cart']);
  }
  viewProductDetails(product: any) {
    this.router.navigate(['/view-details'], { state: { product } });
  }
}
