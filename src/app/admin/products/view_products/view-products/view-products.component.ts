import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  filteredproducts: ProductDTO[] = [];
  brands: BrandDTO[] = [];
  categories: CategoryDTO[] = [];
  subCategories: SubCategoryDTO[] = [];



  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private productService: ProductService,
    private router: Router,
    private brandServices :BrandService,
    private categoryService :CategoryService,
    private subCategoryService : SubCategoryService,

  ) { };


  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.getAllCategories();
    this.getAllSubCategories();
  }


  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.filteredproducts = res.data;
      },
      (error) => {
        console.log("Product Not Shown", error);
      }
    )
  }

  getAllBrands() {
    this.brandServices.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
        console.log("Brand is  Not Shown", error);
      }
    )
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Category is Not Shown", error);
      }
    )
  }
  getAllSubCategories() {
    this.subCategoryService.getAllSubCategories().subscribe(
      (res: any) => {
        this.subCategories = res.data;
      },
      (error) => {
        console.log("SubCategory is Not Shown", error);
      }
    )
  }

  addProduct() {
    alert("Please confirm if you want to add the product.");
    this.router.navigate(['admin/add-products']);
  }



  getBrandName(brandId: number): string {
    const foundBrand = this.brands.find(brand => brand.brandId === brandId);
    return foundBrand ? foundBrand.brandName : 'Unknown';
  }

  getCategoryName(categoryId: number): string {
    const foundCategory = this.categories.find(category => category.categoryId === categoryId);
    return foundCategory ? foundCategory.categoryName : 'Unknown';
  }

  getSubCategoryName(subCategoryId: number): string {
    const foundSubCategory = this.subCategories.find(subCategory => subCategory.subCategoryId === subCategoryId);
    return foundSubCategory ? foundSubCategory.subCategoryName : 'Unknown';
  }




  calculateTotalPages() {
    if (this.filteredproducts) {
      this.totalItems = this.filteredproducts.length;
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
