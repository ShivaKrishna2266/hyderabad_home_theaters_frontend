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
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  filteredproducts: ProductDTO[] = [];
  products: ProductDTO[] = [];  // Store all products to filter
  productNameFilter: string = '';  // Filter by product name
  statusFilter: string = '';       // Filter by product status
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
    private brandServices: BrandService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.getAllCategories();
    this.getAllSubCategories();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (res: {data: ProductDTO[]}) => {
        this.products = res.data.map(product => ({
          ...product,
          images: product.images ?? [],
        })) ;
        this.applyFilters();     
        this.totalItems = this.products.length;   
      },
      (error) => {
        console.log("Product Not Shown", error);
      }
    );
  }

  getAllBrands() {
    this.brandServices.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
        console.log("Brand is Not Shown", error);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Category is Not Shown", error);
      }
    );
  }

  getAllSubCategories() {
    this.subCategoryService.getAllSubCategories().subscribe(
      (res: any) => {
        this.subCategories = res.data;
      },
      (error) => {
        console.log("SubCategory is Not Shown", error);
      }
    );
  }

  addProduct() {
    alert("Please confirm if you want to add the product.");
    this.router.navigate(['admin/add-products']);
  }

  updateProduct(product: ProductDTO) {
    this.dataService.productData = product;
    this.router.navigate(['admin/edit-products']);
  }

  deleteProduct(product: ProductDTO): void{
    const confirmDelete = confirm(`Are you sure you want to delete the product: ${product.productName}?`);
  if (!confirmDelete) return;

  this.productService.deleteProduct(product).subscribe({
    next: () => this.getAllProducts(),  // ✅ Refresh the brand list after deletion
    error: err => console.error('Delete failed', err)
  });
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

  // Apply filters based on product name and status
  applyFilters(): void {
  this.filteredproducts = this.products.filter(product => {
    const matchesProductName = this.productNameFilter
      ? product.productName.toLowerCase().includes(this.productNameFilter.toLowerCase())
      : true;

    // Check if product.status is a string or boolean and compare accordingly
    const matchesStatus = this.statusFilter
      ? (typeof product.status === 'string'
        ? product.status.toLowerCase() === this.statusFilter.toLowerCase()
        : product.status === (this.statusFilter === 'Active'))
      : true;

    return matchesProductName && matchesStatus;
  });

  this.calculateTotalPages();
}


  // Calculate total pages after applying the filter
  calculateTotalPages() {
    this.totalItems = this.filteredproducts.length;
  }

  getTotalPages(): number {
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