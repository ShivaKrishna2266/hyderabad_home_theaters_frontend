import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../services/brands/brand.service';
import { BrandDTO } from '../DTO/brandDTO';
import { ProductDTO } from '../DTO/productDTO';
import { ProductService } from '../services/product/product.service';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: BrandDTO[] = [];
  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  brandId: number | null = null;
  brandName: string = '';
  displayedBrands: BrandDTO[] = [];
  searchBrandName: string = '';

  // Pagination
  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 0;

  // Filter properties
  searchName: string = '';
  selectedPriceRange: any = null;
  // priceRanges = [
  //   { label: '₹100 - ₹499.99', from: 100, to: 499.99 },
  //   { label: '₹500 - ₹999.99', from: 500, to: 999.99 },
  //   { label: '₹1,000 - ₹1,499.99', from: 1000, to: 1499.99 },
  //   { label: '₹1,500 - ₹1,999.99', from: 1500, to: 1999.99 },
  //   { label: '₹2,000 - ₹2,499.99', from: 2000, to: 2499.99 },
  //   { label: '₹2,500 - ₹4,999.99', from: 2500, to: 4999.99 },
  //   { label: '₹5,000 - ₹9,999.99', from: 5000, to: 9999.99 }
  // ];
  priceRanges = [
    { label: 'Under ₹1000', min: 0, max: 1000 },
    { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
    { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
    { label: 'Above ₹10000', min: 10000, max: Infinity }
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataLoaderService: DataLoaderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.displayedBrands = this.brands;
    this.route.paramMap.subscribe(params => {
      const id = params.get('brandId');
      if (id) {
        this.brandId = Number(id);
        this.getProductsByBrand(this.brandId);
        this.getBrandName(this.brandId);
      } else {
        this.brandId = null;
        this.products = [];
        this.filteredProducts = [];
        this.brandName = '';
      }
    });

    this.getAllBrands();
  }

  getBrandName(brandId: number): void {
    this.dataLoaderService.getBrandById(brandId).subscribe({
      next: (response) => {
        const brand = response?.data;
        this.brandName = brand?.brandName || 'Unknown Brand';
      },
      error: (error) => {
        console.error('Error fetching brand name:', error);
        this.brandName = 'Unknown Brand';
      }
    });
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res?.data || [];
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
          this.filteredProducts = [...this.products]; // Initialize filteredProducts
        } else {
          console.warn('No products found for category ID:', brandId);
          this.products = []; // Ensure the array is reset if no data is received
          this.filteredProducts = [];
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.products = []; // Reset on error to avoid stale data
        this.filteredProducts = [];
      }
    );
  }


  filterBrands(): void {
    const term = this.searchBrandName?.trim().toLowerCase() || '';
    if (!term) {
      this.displayedBrands = [...this.brands]; // Show all brands if search is empty
      return;
    }
  
    this.displayedBrands = this.brands.filter(brand =>
      brand.brandName?.toLowerCase().includes(term)
    );
  }
  
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (!this.selectedPriceRange ||
        (product.productPrice >= this.selectedPriceRange.min &&
          product.productPrice <= this.selectedPriceRange.max))
    );
  }

  applySelectedPriceRange(): void {
    this.filterProducts();
  }

  showBrands(): void {
    this.brandId = null;
    this.brandName = '';
    this.products = [];
    this.filteredProducts = [];
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

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  viewProductDetails(product: any) {
    this.router.navigate(['/view-details'], { state: { product } });
  }
}