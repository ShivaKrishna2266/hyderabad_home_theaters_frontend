import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductDTO[] = [];
  displayedProducts: ProductDTO[] = [];
  categories: CategoryDTO[] = [];
  paginatedCategories: CategoryDTO[] = [];
  categoryId: number | null = null;
  brands: BrandDTO[] = [];

  // showCategories: boolean = true; // Set to false to hide categories

  // Separate Pagination States
  currentProductPage: number = 1;
  currentCategoryPage: number = 1;
  itemsPerPage: number = 4; // Show 4 items per page
Math: any;

  constructor(
              private dataLoaderService: DataLoaderService,
              public router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllProducts(): void {
    this.dataLoaderService.getAllProducts().subscribe(
      (res: { data: ProductDTO[] }) => {
        this.products = res.data;
        this.updateDisplayedProducts(); // Set first page
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllCategories(): void {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: { data: CategoryDTO[] }) => {
        this.categories = res.data;
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(
      (response: BrandDTO[] | { data: BrandDTO[] } | any) => { // Explicitly define possible types
        console.log('API Response:', response); // Debugging log
  
        // Ensure response is an array before using reduce
        if (Array.isArray(response)) {
          this.brands = response.reduce((acc: { [key: number]: string }, brand: BrandDTO) => {
            acc[brand.brandId] = brand.brandName; // Map brandId to brandName
            return acc;
          }, {});
        } else if (response && response.data && Array.isArray(response.data)) {
          // Handle case where API returns { data: [...] }
          this.brands = response.data.reduce((acc: { [key: number]: string }, brand: BrandDTO) => {
            acc[brand.brandId] = brand.brandName;
            return acc;
          }, {});
        } else {
          console.error('Unexpected response format:', response);
          this.brands = response.data; // Fallback to an empty object
        }
      },
    );
  }
  
  

  updateDisplayedProducts(): void {
    const startIndex = (this.currentProductPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentProductPage < Math.ceil(this.products.length / this.itemsPerPage)) {
      this.currentProductPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage(): void {
    if (this.currentProductPage > 1) {
      this.currentProductPage--;
      this.updateDisplayedProducts();
    }
  }

  updatePagination(): void {
    const startIndex = (this.currentCategoryPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
  }

  nextPage2(): void {
    if (this.currentCategoryPage < Math.ceil(this.categories.length / this.itemsPerPage)) {
      this.currentCategoryPage++;
      this.updatePagination();
    }
  }

  prevPage2(): void {
    if (this.currentCategoryPage > 1) {
      this.currentCategoryPage--;
      this.updatePagination();
    }
  }

  get totalproductPages(): number {
    return this.products.length ? Math.ceil(this.products.length / this.itemsPerPage) : 1;
  }

  get totalCategoryPages(): number {
    return this.categories.length ? Math.ceil(this.categories.length / this.itemsPerPage) : 1;
  }

  filterSubcategories(): void {
    this.categories = this.categories.filter(sub => sub.categoryId === this.categoryId);
  }

  showCategories(): void {
    this.categoryId = null;
    this.categories = [];
    this.router.navigate(['/categories']);
  }

}
