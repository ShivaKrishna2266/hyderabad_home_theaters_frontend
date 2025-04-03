import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-sub-category',
  templateUrl: './view-sub-category.component.html',
  styleUrls: ['./view-sub-category.component.scss']
})
export class ViewSubCategoryComponent implements OnInit {

  filteredSubCategory: SubCategoryDTO[] = [];
  categories: CategoryDTO[] = [];
  products: ProductDTO[] = [];



  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private dataService: DataService,

  ) { }

  ngOnInit(): void {
    this.getAllSubCategories();
    this.getAllCategories();
    this.getAllProducts();
  }



  getAllSubCategories() {
    this.subCategoryService.getAllSubCategories().subscribe(
      (res: any) => {
        this.filteredSubCategory = res.data;
      },
      (error) => {
        console.log("Not Show SubCategory Date", error);
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Not Show Category Date", error);
      });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data;
      },
      (error) => {
        console.log("Not Show Product Date", error);
      });
  }

  getCategoryName(categoryId: number): string {
    const foundCategory = this.categories.find(category => category.categoryId === categoryId);
    return foundCategory ? foundCategory.categoryName : "Unknown";
  }

  getProductName(productId: number): string {
    const foundProduct = this.products.find(product => product.productId === productId);
    return foundProduct ? foundProduct.productName : "Unknown"
  }



  addSubCategories() {
    this.router.navigate(['/admin/add-subCategory'])
  }

  updateCategory(subCategory: SubCategoryDTO) {
    this.dataService.subCategoryData = subCategory,
    this.router.navigate(['admin/edit-subCategory']);
  }






  calculateTotalPages() {
    if (this.filteredSubCategory) {
      this.totalItems = this.filteredSubCategory.length;
    } else {
      this.totalItems = 0;
    }
  }

  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

}

