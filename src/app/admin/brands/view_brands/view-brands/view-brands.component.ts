import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';

import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-brands',
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.scss']
})
export class ViewBrandsComponent implements OnInit {
 public brands: BrandDTO[] = [];             // Full list
  public filteredBrands: BrandDTO[] = [];     // Filtered result for display
  public categories: CategoryDTO[] = [];

  public selectedBrandId: number | null = null;
  public selectedStatus: string | null = null;

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private brandService: BrandService,
    private router: Router,
    private dataService: DataService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllCategories();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (res: { data: BrandDTO[] }) => {
        this.brands = res.data;
        this.applyFilters(); // Apply filters after data is loaded
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.error("Error fetching categories", error)
      }
    );
  }

 applyFilters() {
  this.currentPage = 1;

  this.filteredBrands = this.brands.filter(brand => {
    const matchesBrand = this.selectedBrandId ? brand.brandId === this.selectedBrandId : true;
    const matchesStatus = this.selectedStatus
      ? brand.status?.toLowerCase().trim() === this.selectedStatus.toLowerCase().trim()
      : true;

    return matchesBrand && matchesStatus;
  });

  this.totalItems = this.filteredBrands.length;
}


  getCategoryName(categoryId: number): string {
    const found = this.categories.find(category => category.categoryId === categoryId);
    return found ? found.categoryName : "Unknown";
  }

  addBrands(): void {
    this.router.navigate(['admin/add-brands']);
  }

  updateBrand(brand: BrandDTO): void {
    this.dataService.brandData = brand;
    this.router.navigate(['admin/edit-brands']);
  }

deleteBrand(brand: BrandDTO): void {
  const confirmDelete = confirm(`Are you sure you want to delete the brand: ${brand.brandName}?`);
  if (!confirmDelete) return;

  this.brandService.deleteBrand(brand).subscribe({
    next: () => this.getAllBrands(),  // ✅ Refresh the brand list after deletion
    error: err => console.error('Delete failed', err)
  });
}

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
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
}