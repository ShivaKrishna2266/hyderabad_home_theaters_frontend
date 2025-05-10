import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { ReviewDTO } from 'src/app/DTO/reviewDTO';
import { ProductService } from 'src/app/services/admin/product.service';
import { ReviewService } from 'src/app/services/admin/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviews: ReviewDTO[] = [];
  filteredReviews: ReviewDTO[] = [];
  products: ProductDTO[] = [];

  selectedStatus: string | null = null;
  selectedProductId: number | null = null;

  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(
    private reviewService: ReviewService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllReview();
    this.getAllProducts();
  }

  getAllReview(): void {
    this.reviewService.getAllReviews().subscribe(
      (res: { data: ReviewDTO[] }) => {
        this.reviews = res.data;
        console.log('Review data:', this.reviews);
        this.filteredReviews = [...this.reviews];
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: ProductDTO[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredReviews = this.reviews.filter((review) => {
      const matchesStatus = this.selectedStatus ? review.status === this.selectedStatus : true;
      const matchesProduct = this.selectedProductId !== null ? review.productId === this.selectedProductId : true;
      return matchesStatus && matchesProduct;
    });
    this.totalItems = this.filteredReviews.length;
    this.currentPage = 1;
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.productName : 'Unknown';
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getPaginatedReviews(): ReviewDTO[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredReviews.slice(start, start + this.pageSize);
  }
}