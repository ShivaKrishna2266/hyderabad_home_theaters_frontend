import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { BrandService } from 'src/app/services/brands/brand.service';

@Component({
  selector: 'app-view-brands',
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.scss']
})
export class ViewBrandsComponent implements OnInit {
  public filteredBrands: BrandDTO[] = [];



  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private brandService: BrandService,
    private router: Router,
  ) { };

  ngOnInit(): void {
    this.getAllBrands();
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

  addBrands(): void {
    this.router.navigate(['admin/add-brands']);
  }

  updateBrand(brand: BrandDTO){
    this.router.navigate(['admin/edit-brands']);
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
