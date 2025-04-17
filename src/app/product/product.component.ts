import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { ProductDTO } from '../DTO/productDTO';
import { BrandDTO } from '../DTO/brandDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  brands: { [key: number]: string } = {};

  searchName: string = '';
  priceFrom: number | null = null;
  priceTo: number | null = null;
  selectedPriceRange: any = null;

//pagenation
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 0;


  priceRanges = [
    { label: '₹100 - ₹499.99', from: 100, to: 499.99 },
    { label: '₹500 - ₹999.99', from: 500, to: 999.99 },
    { label: '₹1,000 - ₹1,499.99', from: 1000, to: 1499.99 },
    { label: '₹1,500 - ₹1,999.99', from: 1500, to: 1999.99 },
    { label: '₹2,000 - ₹2,499.99', from: 2000, to: 2499.99 },
    { label: '₹2,500 - ₹4,999.99', from: 2500, to: 4999.99 },
    { label: '₹5,000 - ₹9,999.99', from: 5000, to: 9999.99 }
  ];

  constructor(
    private dataLoaderService: DataLoaderService,
    public router: Router,
    private route: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    this.filteredProducts = [...this.products];
    this.getAllProducts();
    this.getAllBrands();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const nameMatch = this.searchName
        ? product.productName.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const fromMatch = this.priceFrom != null
        ? product.productPrice >= this.priceFrom
        : true;

      const toMatch = this.priceTo != null
        ? product.productPrice <= this.priceTo
        : true;

      return nameMatch && fromMatch && toMatch;
    });
  }

  applySelectedPriceRange() {
    if (this.selectedPriceRange) {
      this.priceFrom = this.selectedPriceRange.from;
      this.priceTo = this.selectedPriceRange.to;
      this.filterProducts();
    }
  }

  getAllProducts(): void {
    this.dataLoaderService.getAllProducts().subscribe(
      (res: { data: ProductDTO[] }) => {
        this.products = res.data;
        this.filteredProducts = res.data; // copy for filtering

        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updateDisplayedProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(response => {
      const brandList = Array.isArray(response) ? response : response?.data;
      if (Array.isArray(brandList)) {
        this.brands = brandList.reduce((acc: { [key: number]: string }, { brandId, brandName }: BrandDTO) => {
          acc[brandId] = brandName;
          return acc;
        }, {});
      } else {
        console.error('Unexpected brand response format:', response);
      }
    });
  }

 
  viewProductDetails(product: ProductDTO): void {
    this.router.navigate(['/view-details'], { state: { product } });
  }

  addToCart(product: ProductDTO): void {
    this.dataLoaderService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.products.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
}