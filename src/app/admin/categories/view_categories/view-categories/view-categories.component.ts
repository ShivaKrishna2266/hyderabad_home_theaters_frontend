import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit{
  public filteredCategories: CategoryDTO[] = [];
  public brands: BrandDTO[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public statusFilter: string = '';
  public selectedCategoryId: number | null = null;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dataService: DataService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (res) => {
        this.brands = res.data;
      },
      (error) => {
        console.error('Failed to fetch brands', error);
      }
    );
  }

  getBrandName(brandId: number): string {
    const foundBrand = this.brands.find(brand => brand.brandId === brandId);
    return foundBrand ? foundBrand.brandName : 'Unknown';
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.filteredCategories = res.data;
        this.calculateTotalPages();
      },
      (error) => {
        console.error('Failed to fetch categories', error);
      }
    );
  }

  addCategories(): void {
    alert('You want to add a Category');
    this.router.navigate(['admin/add-categories']);
  }

  updateCategory(category: CategoryDTO): void {
    console.log('Updating Category:', category);
    this.dataService.categoryData = category;
    this.router.navigate(['/admin/edit-categories']);
  }

  calculateTotalPages(): void {
    this.totalItems = this.filteredCategories.length;
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
