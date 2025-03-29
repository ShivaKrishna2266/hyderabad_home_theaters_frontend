import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { CategoryService } from 'src/app/services/admin/category.service';
import { BrandService } from 'src/app/services/brands/brand.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-brands',
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.scss']
})
export class ViewBrandsComponent implements OnInit {
  public filteredBrands: BrandDTO[] = [];
  categories: CategoryDTO[] = [];



  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private brandService: BrandService,
    private router: Router,
    private dataService: DataService,
    private categoryService: CategoryService
  ) { };

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllCategories();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (res: { data: BrandDTO[] }) => {
        this.filteredBrands = res.data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.error(" Not showing Categories", error)
      }
    )
  }

  addBrands(): void {
    alert("you want to Add Brand")
    this.router.navigate(['admin/add-brands']);
  }

  updateBrand(brand: BrandDTO) {
    this.dataService.brandData = brand,
      this.router.navigate(['admin/edit-brands']);
  }

  getCategoryName(categoryId: number): string {
    const foundCategory = this.categories.find(category => category.categoryId === categoryId);
    return foundCategory ? foundCategory.categoryName : "Unknow";
  }


  calculateTotalPages() {
    if (this.filteredBrands) {
      this.totalItems = this.filteredBrands.length;
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
