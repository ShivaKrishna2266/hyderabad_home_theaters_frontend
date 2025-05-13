import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { QuestionDTO } from 'src/app/DTO/questionDTO';
import { ProductService } from 'src/app/services/admin/product.service';
import { QuestionsService } from 'src/app/services/admin/questions.service';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit{
 questions: QuestionDTO[] = [];
  filteredQuestions: QuestionDTO[] = [];
  paginatedQuestions: QuestionDTO[] = [];
  products: ProductDTO[] = [];

  selectedStatus: string | null = null;
  selectedProductId: number | null = null;
  searchName: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(
    private questionsService: QuestionsService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res.data || [];
    });
  }

  getAllQuestions() {
    this.questionsService.getAllQuestions().subscribe(
      (res: any) => {
        this.questions = Array.isArray(res.data) ? res.data : [];
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }


  
  applyFilters(): void {
    this.filteredQuestions = this.questions.filter((question) => {
      const matchesStatus = this.selectedStatus ? question.status === this.selectedStatus : true;
      const matchesProduct = this.selectedProductId ? question.productId === this.selectedProductId : true;
      const matchesName = this.searchName
        ? question.userName.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
      return matchesStatus && matchesProduct && matchesName;
    });

    this.totalPages = Math.ceil(this.filteredQuestions.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedQuestions();
  }

  updatePaginatedQuestions(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedQuestions = this.filteredQuestions.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedQuestions();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedQuestions();
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.productName : 'N/A';
  }


}
