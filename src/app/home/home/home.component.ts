import { Component, OnInit } from '@angular/core';
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

  showCategories: boolean = true; // Set to false to hide categories

  // Separate Pagination States
  currentProductPage: number = 1;
  currentCategoryPage: number = 1;
  itemsPerPage: number = 4; // Show 4 items per page
Math: any;

  constructor(private dataLoaderService: DataLoaderService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
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

}
